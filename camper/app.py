# coding=utf-8

import pymongo
import locale
import yaml
import pkg_resources
import werkzeug.exceptions

from starflyer import Application, URL, AttributeMapper, Handler
from sfext.uploader import upload_module, Assets, ImageSizeProcessor
from sfext.uploader.stores import FilesystemStore
from sfext.babel import babel_module, T
from sfext.mail import mail_module
from exceptions import *

import markdown
import bleach
import logbook

import re
from jinja2 import evalcontextfilter, Markup, escape
from etherpad_lite import EtherpadLiteClient

import userbase
import handlers
import barcamps
import db
import login
import blog
import pages

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

def textify(text):
    """return a plain text copy of a possible html text"""
    return bleach.clean(text, strip = True, tags = [])

###
### i18n
###

# TODO: retrieve available languages from the i18n module
ACCEPTED_LANGUAGES = ['de', 'en']

# From django.utils.translation.trans_real.to_locale
def to_locale(language, to_lower=False):
    """
    Turns a language name (en-us) into a locale name (en_US). If 'to_lower' is
    True, the last component is lower-cased (en_us).
    """
    p = language.find('-')
    if p >= 0:
        if to_lower:
            return language[:p].lower()+'_'+language[p+1:].lower()
        else:
            # Get correct locale for sr-latn
            if len(language[p+1:]) > 2:
                return language[:p].lower()+'_'+language[p+1].upper()+language[p+2:].lower()
            return language[:p].lower()+'_'+language[p+1:].upper()
    else:
        return language.lower()


# From django.utils.translation.trans_real.parse_accept_lang_header
accept_language_re = re.compile(r'''
        ([A-Za-z]{1,8}(?:-[A-Za-z]{1,8})*|\*)         # "en", "en-au", "x-y-z", "*"
        (?:\s*;\s*q=(0(?:\.\d{,3})?|1(?:.0{,3})?))?   # Optional "q=1.00", "q=0.8"
        (?:\s*,\s*|$)                                 # Multiple accepts per header.
        ''', re.VERBOSE)

def parse_accept_lang_header(lang_string):
    """
    Parses the lang_string, which is the body of an HTTP Accept-Language
    header, and returns a list of (lang, q-value), ordered by 'q' values.
    Any format errors in lang_string results in an empty list being returned.
    """
    result = []
    pieces = accept_language_re.split(lang_string)
    if pieces[-1]:
        return []
    for i in range(0, len(pieces) - 1, 3):
        first, lang, priority = pieces[i : i + 3]
        if first:
            return []
        priority = priority and float(priority) or 1.0
        result.append((lang, priority))
    result.sort(key=lambda k: k[1], reverse=True)
    return result


def parse_http_accept_language(accept):
    for accept_lang, unused in parse_accept_lang_header(accept):
        if accept_lang == '*':
            break

        # We have a very restricted form for our language files (no encoding
        # specifier, since they all must be UTF-8 and only one possible
        # language each time. So we avoid the overhead of gettext.find() and
        # work out the MO file manually.

        # 'normalized' is the root name of the locale in POSIX format (which is
        # the format used for the directories holding the MO files).
        normalized = locale.locale_alias.get(to_locale(accept_lang, True))
        if not normalized:
            continue
        # Remove the default encoding from locale_alias.
        normalized = normalized.split('.')[0]

        for lang_code in (accept_lang, accept_lang.split('-')[0]):
            lang_code = lang_code.lower()
            if lang_code in ACCEPTED_LANGUAGES:
                return lang_code
    return None
    


def get_locale(handler):
    al = handler.request.headers.get('Accept-Language', '')
    request_lang = parse_http_accept_language(al)
    
    # default
    l = "en"
    if request_lang is not None:
        l = request_lang

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
### robots.txt
### 

class RobotsTXT(Handler):
    """serve robots.txt"""

    template = "robots.txt"

    def get(self):
        """serve the file"""
        if self.config.hide_from_crawlers:
            return self.render()
        raise werkzeug.exceptions.NotFound()


class NotFound(Handler):
    """serve the not found page"""

    template = "404.html"

    def get(self):
        """serve the file"""
        return self.render()

###
### APP
###

class CamperApp(Application):
    """application"""

    defaults = {
        'hide_from_crawlers'    : False,
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
        'mongodb_url'           : "mongodb://localhost/camper",
        'mapbox_access_token'   : "",
        'mapbox_map_id'         : "",
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
        'log_filename'          : "/tmp/camper.log",
    }

    modules = [
        babel_module(
            locale_selector_func = get_locale,
        ),
        userbase.email_userbase(
            url_prefix                  = "/users",
            mongodb_name                = "camper",
            master_template             = "master.html",
            login_after_registration    = True,
            double_opt_in               = True,
            enable_registration         = True,
            enable_usereditor           = True,
            user_class                  = db.CamperUser,
            use_remember                = True,
            login_form                  = login.EMailLoginForm,
            urls                        = {
                'activation'            : {'endpoint' : 'activation'}, # we use our own activation handler 
                'activation_success'    : {'endpoint' : 'index'},
                'activation_code_sent'  : {'endpoint' : 'userbase.activate'},
                'login_success'         : {'endpoint' : 'login_success'},
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
        blog.blog_module(url_prefix="/"),
        pages.pages_module(url_prefix="/"),
    ]

    jinja_filters = {
        'nl2br' : nl2br,
        'currency' : do_currency,
        'tojson' : _tojson_filter,
        'md' : markdownify,
        'textify' : textify,
    }

    routes = [
        URL('/', 'index', handlers.index.IndexView),
        URL('/past', 'past_barcamps', handlers.index.PastBarcampsView),
        URL('/own', 'own_barcamps', handlers.index.OwnBarcampsView),
        URL('/login_success', 'login_success', handlers.index.LoginSuccess),
        URL('/robots.txt', 'robots', RobotsTXT),
        URL('/impressum.html', 'impressum', handlers.index.Impressum),
        URL('/', 'root', handlers.index.IndexView),
        URL('/', 'login', handlers.index.IndexView),
        URL('/assets/', 'asset_upload', handlers.images.AssetUploadView),
        URL('/assets/<asset_id>', 'asset', handlers.images.AssetView),

        # sponsoring
        URL('/sponsoring', 'sponsoring', handlers.sponsor.SponsorContactView),

        # user stuff
        URL('/u/<username>', 'profile', handlers.users.profile.ProfileView),
        URL('/u/image_upload', 'profile_image_upload', handlers.users.ProfileImageAssetUploadView),
        URL('/u/image_delete', 'profile_image_delete', handlers.users.edit.ProfileImageDeleteView),
        URL('/u/edit', 'profile_edit', handlers.users.edit.ProfileEditView),
        URL('/u/change_email', 'email_edit', handlers.users.change_email.EMailEditView),
        URL('/u/confirm_email', 'confirm_email', handlers.users.change_email.ConfirmEMail),
        URL('/u/activate', 'activation', handlers.users.activation.ActivationHandler),

        # admin area
        URL('/admin/', "admin_index", handlers.admin.index.IndexView),
    ]

    def finalize_setup(self):
        """do our own configuration stuff"""
        self.config.dbs = AttributeMapper()
        mydb = self.config.dbs.db = pymongo.MongoClient(self.config.mongodb_url)[self.config.mongodb_name]
        self.config.dbs.barcamps = db.Barcamps(mydb.barcamps, app=self, config=self.config)
        self.config.dbs.sessions = db.Sessions(mydb.sessions, app=self, config=self.config)
        self.config.dbs.pages = db.Pages(mydb.pages, app=self, config=self.config)
        self.config.dbs.blog = db.BlogEntries(mydb.blog, app=self, config=self.config)
        self.config.dbs.galleries = db.ImageGalleries(mydb.galleries, app=self, config=self.config)
        self.config.dbs.session_comments = db.Comments(mydb.session_comments, app=self, config=self.config)
        self.config.dbs.participant_data = db.DataForms(mydb.participant_data, app=self, config=self.config)
        self.config.dbs.tickets = db.Tickets(mydb.tickets, app=self, config=self.config)
        self.config.dbs.userfavs = db.UserFavs(mydb.userfavs, app=self, config=self.config)
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
                    'logo_full' : "1140x",
                    'medium_user' : "296x",
                    'userlist': '80x80!',
                    'fullwidth' : "850x",
                    'gallery' : "700x300!",
                    'facebook' : "1200x630",
                })
            ],
        ))


    def setup_logger(self):                                                                                                                                                                            
        format_string = '[{record.time:%Y-%m-%d %H:%M:%S.%f%z}] {record.level_name} {record.channel} : {record.message} (in {record.filename}:{record.lineno}), args: {record.kwargs})'

        handler = logbook.FileHandler(self.config.log_filename, format_string = format_string, bubble=True)
        return logbook.NestedSetup([
            handler,
        ])

    def handle_http_exception(self, request, e):
        """handle http exceptions"""

        logger = logbook.Logger("error")
        if e.code != 404:
            logger.warn("http error", code = e.code, url = request.path)

        # setup the request properly for handlers to use
        urls = self.create_url_adapter(request)
        request.url_adapter = urls

        # we return a 404 now for every exception which probably is not good
        handler = NotFound(self, request)

        resp = handler()
        resp.status_code = e.code # take code from exception
        return resp


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


