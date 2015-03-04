# coding=utf-8

import pymongo
import yaml
import pkg_resources

from starflyer import Application, URL, AttributeMapper
from sfext.uploader import upload_module, Assets, ImageSizeProcessor
from sfext.uploader.stores import FilesystemStore
from sfext.babel import babel_module, T
from sfext.mail import mail_module
from exceptions import *

import markdown
import bleach

import re
from jinja2 import evalcontextfilter, Markup, escape
from etherpad_lite import EtherpadLiteClient

import userbase
import handlers
import barcamps
import pages
import db
import login

#
# custom jinja filters
#


_paragraph_re = re.compile(r'(?:\r\n|\r|\n){2,}')
_striptags_re = re.compile(r'(<!--.*?-->|<[^>]*>)')

@evalcontextfilter
def nl2br(eval_ctx, value):
    value = _striptags_re.sub(' ', value)
    result = u'\n\n'.join(u'<p>%s</p>' % p.replace('\n', '<br>\n')
                      for p in _paragraph_re.split(escape(value)))
    if eval_ctx.autoescape:
        result = Markup(result)
    return result

def do_currency(value, currency=u"€"):
    """format currency aware"""
    return u'{0:.2f} {1}'.format(value, currency).replace(".",",")

try:
    import simplejson as json
except ImportError:
    import json

if '\\/' not in json.dumps('/'):

    def _tojson_filter(*args, **kwargs):
        return json.dumps(*args, **kwargs).replace('/', '\\/')
else:
    _tojson_filter = json.dumps

def markdownify(text, level=1):
    return bleach.linkify(markdown.markdown(text, safe_mode="remove", extensions=['nl2br', 'headerid(level=%s)' %level]))

###
### i18n
###

# TODO: retrieve available languages from the i18n module
ACCEPTED_LANGUAGES = ['de', 'en']

def parseAcceptLanguage(acceptLanguage):
  if acceptLanguage is None:
    return [("en", 1)]
  languages = acceptLanguage.split(",")
  locale_q_pairs = []

  for language in languages:
    if language.split(";")[0] == language:
      # no q => q = 1
      locale_q_pairs.append((language.strip(), "1"))
    else:
      locale = language.split(";")[0].strip()
      q = language.split(";")[1].split("=")[1]
      locale_q_pairs.append((locale, q))

  return locale_q_pairs

def get_locale(handler):
    al = handler.request.headers.get('Accept-Language')
    languages = parseAcceptLanguage(al)

    # default
    l = "en"

    # find language from request
    for lang,q in languages:
        if lang in ACCEPTED_LANGUAGES:
            l = lang
            break

    # check cookie now if it needs to override
    if handler.session.has_key("LANG"):
        if handler.session['LANG'] in ACCEPTED_LANGUAGES:
            l = handler.session['LANG']

    # or maybe the user wants to force it
    if handler.request.args.has_key("__l"):
        if handler.request.args['__l'] in ACCEPTED_LANGUAGES:
            l = handler.request.args['__l']

    # save in cookie
    handler.session['LANG'] = l
    return l

###
### APP
###

class CamperApp(Application):
    """application"""

    defaults = {
        'log_name'              : "camper",
        'script_virtual_host'   : "http://localhost:8222",
        'virtual_host'          : "http://localhost:8222",
        'virtual_path'          : "",
        'server_name'           : "dev.localhost:9008",
        'title'                 : "Camper - Barcamp Tools",
        'description'           : "barcamp tool",
        'debug'                 : True,
        'mongodb_name'          : "camper",
        'mongodb_port'          : 27017,
        'mongodb_host'          : "localhost",
        'cloudmade_key'         : "",
        'secret_key'            : "7cs687cds6c786cd89&%$%&hhhs8c7zcbs87ct d7stc 8c7cs8 78 7dts 8cs97tugjgjzGUZGUzgcdcg&%%$",
        'session_cookie_domain' : "dev.localhost",
        'smtp_host'             : 'localhost',
        'smtp_port'             : 25,
        'from_addr'             : "noreply@example.org",
        'from_name'             : "Barcamp-Tool",
        'new_bc_notification_addr'      : None, # which email address to notify about newly created and published barcamps
        'sponsor_bc_notification_addr'  : None, # which email address to notify about sponsorship requests 
        'ep_api_key'            : "please fill in from APIKEY.txt",
        'ep_endpoint'           : "http://localhost:9001/api",
        'ga'                    : 'none', #GA key
        'base_asset_path'       : '/tmp', # where to store assets
        'fb_app_id'             : 'PLEASE FILL IN', # get this from developers.facebook.com
    }

    modules = [
        babel_module(
            locale_selector_func = get_locale,
        ),
        userbase.username_userbase(
            url_prefix                  = "/users",
            mongodb_name                = "camper",
            master_template             = "master.html",
            login_after_registration    = True,
            double_opt_in               = True,
            enable_registration         = True,
            enable_usereditor           = True,
            user_class                  = db.CamperUser,
            use_remember                = True,
            login_form                  = login.UsernameLoginForm,
            urls                        = {
                'activation'            : {'endpoint' : 'userbase.activate'},
                'activation_success'    : {'endpoint' : 'index'},
                'activation_code_sent'  : {'endpoint' : 'userbase.activate'},
                'login_success'         : {'endpoint' : 'index'},
                'logout_success'        : {'endpoint' : 'userbase.login'},
                'registration_success'  : {'endpoint' : 'userbase.login'},
            },
            messages                    = AttributeMapper({
                'user_unknown'          : T('User unknown'),
                'email_unknown'         : T('This email address cannot not be found in our user database'),
                'password_incorrect'    : T('Your password is not correct'),
                'user_not_active'       : T('Your user has not yet been activated.'), # maybe provide link here? Needs to be constructed in handler
                'login_failed'          : T('Login failed'),
                'login_success'         : T('Welcome, %(fullname)s'),
                'logout_success'        : T('Your are now logged out'),
                'double_opt_in_pending' : T('To finish the registration process please check your email with instructions on how to activate your account.'),
                'registration_success'  : T('Your user registration has been successful'),
                'activation_success'    : T('Your account has been activated'),
                'activation_failed'     : T('The activation code is not valid. Please try again or click <a href="%(url)s">here</a> to get a new one.'),
                'activation_code_sent'  : T('A new activation code has been sent out, please check your email'),
                'already_active'        : T('The user is already active. Please log in.'),
                'pw_code_sent'          : T('A link to set a new password has been sent to you'),
                'pw_changed'            : T('Your password has been changed'),

                # for user manager
                'user_edited'           : T('The user has been updated.'),
                'user_added'            : T('The user has been added.'),
                'user_deleted'          : T('The user has been deleted.'),
                'user_activated'        : T('The user has been activated.'),
                'user_deactivated'      : T('The user has been deactivated.'),
            }),

            permissions                 = AttributeMapper({
                'userbase:admin'    : T("can manage users"),
                'admin'             : T("main administrator"),
            })
        ),
        mail_module(debug=True),
        barcamps.barcamp_module(url_prefix="/"),
    ]

    jinja_filters = {
        'nl2br' : nl2br,
        'currency' : do_currency,
        'tojson' : _tojson_filter,
        'md' : markdownify,
    }

    routes = [
        URL('/', 'index', handlers.index.IndexView),
        URL('/impressum.html', 'impressum', handlers.index.Impressum),
        URL('/', 'root', handlers.index.IndexView),
        URL('/', 'login', handlers.index.IndexView),
        URL('/assets/', 'asset_upload', handlers.images.AssetUploadView),
        URL('/assets/<asset_id>', 'asset', handlers.images.AssetView),

        # sponsoring
        URL('/sponsoring', 'sponsoring', handlers.sponsor.SponsorContactView),

        # admin area
        URL('/admin/', "admin_index", handlers.admin.index.IndexView),
        URL('/admin/pages', "admin_pages", handlers.admin.pages.PagesView),
        URL('/admin/pages/<slot>/add', 'admin_pages_add', pages.add.AddView),
        URL('/s/<page_slug>', 'page', pages.view.View),

        # user stuff
        URL('/u/<username>', 'profile', handlers.users.profile.ProfileView),
        URL('/u/image_delete', 'profile_image_delete', handlers.users.edit.ProfileImageDeleteView),
        URL('/u/edit', 'profile_edit', handlers.users.edit.ProfileEditView),

        # pages for barcamps
        URL('/<slug>/page_add/<slot>', 'barcamp_page_add', pages.add.AddView),
        URL('/<slug>/<page_slug>', 'barcamp_page', pages.view.View),
        URL('/<slug>/<page_slug>/upload', 'page_image_upload', pages.images.ImageUpload),
        URL('/<slug>/<page_slug>/layout', 'page_layout', pages.edit.LayoutView),
        URL('/<slug>/<page_slug>/edit', 'page_edit', pages.edit.EditView),
        URL('/<slug>/<page_slug>/partial_edit', 'page_edit_partial', pages.edit.PartialEditView),
        URL('/<slug>/<page_slug>/delete', 'page_image_delete', pages.images.ImageDelete),
        URL('/<slug>/<page_slug>/image', 'page_image', pages.images.Image),

    ]

    def finalize_setup(self):
        """do our own configuration stuff"""
        self.config.dbs = AttributeMapper()
        mydb = self.config.dbs.db = pymongo.Connection(
            self.config.mongodb_host,
            self.config.mongodb_port
        )[self.config.mongodb_name]
        self.config.dbs.barcamps = db.Barcamps(mydb.barcamps, app=self, config=self.config)
        self.config.dbs.sessions = db.Sessions(mydb.sessions, app=self, config=self.config)
        self.config.dbs.pages = db.Pages(mydb.pages, app=self, config=self.config)
        self.config.dbs.session_comments = db.Comments(mydb.session_comments, app=self, config=self.config)
        self.config.dbs.participant_data = db.DataForms(mydb.participant_data, app=self, config=self.config)
        self.module_map.uploader.config.assets = Assets(mydb.assets, app=self, config=self.config)

        # etherpad connection
        self.config.etherpad = EtherpadLiteClient(
            base_params={'apikey': self.config.ep_api_key},
            base_url=self.config.ep_endpoint
        )

    def finalize_modules(self):
        """finalize all modules"""
        fsstore = FilesystemStore(base_path = self.config.base_asset_path)
        self.modules.append(upload_module(store = fsstore,
            processors = [
                ImageSizeProcessor({
                    'thumb' : "50x50!",
                    'small' : "100x",
                    'logo_full' : "940x",
                    'medium_user' : "296x",
                    'large' : "1200x",
                })
            ],
        ))

    def get_barcamp(self, slug):
        """return a barcamp by it's slug

        :param slug: slug of the barcamp to retrieve
        :returns: barcamp object or
        """
        barcamp = self.config.dbs.barcamps.by_slug(slug)
        if barcamp is None:
            raise BarcampNotFound(slug = slug)
        return barcamp

from werkzeug import DebuggedApplication

def test_app(config, **local_config):
    """return the app for testing"""
    return CamperApp(__name__, local_config)


def app(config, **local_config):
    """return the config"""
    app = CamperApp(__name__, local_config)
    if app.config.debug:
        return DebuggedApplication(app)
    return app


