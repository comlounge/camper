# coding=utf-8

import pymongo
import locale
import yaml
import pkg_resources
import werkzeug.exceptions
from werkzeug.utils import redirect
from werkzeug.datastructures import MultiDict


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
from userbase.hooks import Hooks
from userbase.handlers.forms import BaseForm
from wtforms import Form, TextField, PasswordField, BooleanField, validators, SelectMultipleField, widgets, HiddenField
from wtforms import ValidationError
import handlers
import barcamps
import db
import login
import blog
import pages

import random
import uuid
from werkzeug.exceptions import BadRequest


class EMailRegistrationForm(BaseForm):
    email       = TextField('E-Mail',       [validators.Length(max=200), validators.Email(), validators.Required()])
    password    = PasswordField('Password', [validators.Required(), validators.EqualTo('password2', message='Passwords must match')])
    password2   = PasswordField('Password confirmation', [validators.Length(max=135), validators.Required()])
    fullname    = TextField('Full name',    [validators.Length(max=200), validators.Required()])
    captcha     = TextField('Captcha',      [validators.Required()])
    captcha_id  = HiddenField('Captcha ID', [])

    # Honeypot fields - hidden via CSS, bots will fill these
    website     = TextField('Website',      [])
    url         = TextField('URL',          [])
    phone       = TextField('Phone',        [])

    def __init__(self, formdata=None, obj=None, prefix='', module=None, handler=None, **kwargs):
        """extend the form with a more data to be stored"""
        import datetime

        # Store these temporarily (will be set again after super().__init__)
        _module = module
        _handler = handler

        # Check if this is a GET request (new form load)
        # formdata will be empty ImmutableMultiDict on GET, populated on POST
        is_new_form = formdata is None or (hasattr(formdata, '__len__') and len(formdata) == 0)

        # Generate captcha if:
        # 1. Handler is available, AND
        # 2. New form (GET request) OR no captcha_id in POST data
        if _handler and hasattr(_handler, 'session'):
            # Initialize captcha storage in session if not present
            if 'registration_captchas' not in _handler.session:
                _handler.session['registration_captchas'] = {}

            # Check if this is a POST with an existing captcha_id
            existing_captcha_id = None
            if formdata and hasattr(formdata, 'get'):
                existing_captcha_id = formdata.get('captcha_id')

            # Generate new captcha if this is a new form or captcha_id is missing/invalid
            if is_new_form or not existing_captcha_id or existing_captcha_id not in _handler.session['registration_captchas']:
                # Generate unique ID for this form instance
                captcha_id = str(uuid.uuid4())

                v1 = random.randint(1, 10)
                v2 = random.randint(2, 10)
                answer = v1 + v2
                question = "Was ist %s+%s?" %(v1, v2)

                # Store captcha data in session with unique ID (server-side, secure)
                _handler.session['registration_captchas'][captcha_id] = {
                    'answer': str(answer),
                    'question': question,
                    'created': datetime.datetime.utcnow().isoformat(),
                    'form_loaded': datetime.datetime.utcnow().isoformat()
                }

                # Set the captcha_id in kwargs so it gets populated in the hidden field
                kwargs['captcha_id'] = captcha_id
            else:
                # Reusing existing captcha - WTForms will populate from formdata
                # But we still need to pass it in kwargs for GET requests after failed POST
                kwargs['captcha_id'] = existing_captcha_id

            # Clean up old captchas (older than 1 hour)
            current_time = datetime.datetime.utcnow()
            captchas_to_remove = []
            for cid, cdata in _handler.session['registration_captchas'].items():
                try:
                    created = datetime.datetime.strptime(cdata['created'], '%Y-%m-%dT%H:%M:%S.%f')
                except:
                    created = datetime.datetime.strptime(cdata['created'], '%Y-%m-%dT%H:%M:%S')
                if (current_time - created).total_seconds() > 3600:  # 1 hour
                    captchas_to_remove.append(cid)
            for cid in captchas_to_remove:
                del _handler.session['registration_captchas'][cid]

        super(BaseForm, self).__init__(formdata=formdata, obj=obj, prefix=prefix, **kwargs)

        # IMPORTANT: Set these AFTER super().__init__() so they persist for validators
        self.module = _module
        self.handler = _handler

        # CRITICAL FIX: After super().__init__(), check if the captcha_id is valid
        # If it's expired/missing, generate a new one and update the field
        if self.handler and hasattr(self.handler, 'session') and 'registration_captchas' in self.handler.session:
            current_captcha_id = self.captcha_id.data
            
            # If the captcha_id from the form is not in session (expired), generate a new one
            if not current_captcha_id or current_captcha_id not in self.handler.session['registration_captchas']:
                
                # Generate new captcha
                new_captcha_id = str(uuid.uuid4())
                v1 = random.randint(1, 10)
                v2 = random.randint(2, 10)
                answer = v1 + v2
                question = "Was ist %s+%s?" %(v1, v2)

                # IMPORTANT: Set form_loaded to 5 seconds in the past
                # This prevents "too fast" errors when the user has already filled out the form
                # and we're just regenerating the captcha due to expiration
                form_loaded_time = datetime.datetime.utcnow() - datetime.timedelta(seconds=5)

                # Store in session
                self.handler.session['registration_captchas'][new_captcha_id] = {
                    'answer': str(answer),
                    'question': question,
                    'created': datetime.datetime.utcnow().isoformat(),
                    'form_loaded': form_loaded_time.isoformat()
                }

                # CRITICAL: Update the form field with the new captcha_id
                self.captcha_id.data = new_captcha_id
                current_captcha_id = new_captcha_id

        # Set the captcha question label and description from session
        if self.handler and hasattr(self.handler, 'session') and 'registration_captchas' in self.handler.session:
            captcha_id = self.captcha_id.data
            if captcha_id and captcha_id in self.handler.session['registration_captchas']:
                question_text = self.handler.session['registration_captchas'][captcha_id]['question']
                self.captcha.label.text = question_text
                self.captcha.description = u'Bitte berechne die Aufgabe und gib das Ergebnis ein'
            else:
                # Fallback if captcha_id is invalid
                self.captcha.label.text = 'Captcha'
                self.captcha.description = u'Bitte Captcha eingeben'
        else:
            # Fallback if no session (shouldn't happen in normal flow)
            self.captcha.label.text = 'Captcha'
            self.captcha.description = u'Bitte Captcha eingeben'

    def validate_email(form, field):
        if form.module.users.find({'email' : field.data}).count() > 0:
            raise ValidationError(T('this email address is already taken'))

    def validate_website(form, field):
        """Honeypot field - should always be empty"""
        if field.data:
            raise ValidationError(u'Spam detected')

    def validate_url(form, field):
        """Honeypot field - should always be empty"""
        if field.data:
            raise ValidationError(u'Spam detected')

    def validate_phone(form, field):
        """Honeypot field - should always be empty"""
        if field.data:
            raise ValidationError(u'Spam detected')

    def validate_captcha(form, field):
        """Validate captcha against session-stored answer"""
        import datetime

        # Better error handling for missing handler
        if not form.handler or not hasattr(form.handler, 'session'):
            raise ValidationError(u'Captcha-Validierung fehlgeschlagen - bitte Formular neu laden')

        # Check if captcha storage exists in session
        if 'registration_captchas' not in form.handler.session:
            raise ValidationError(u'Captcha abgelaufen - bitte neu laden')

        # Get the captcha_id for this form instance
        captcha_id = form.captcha_id.data

        if not captcha_id:
            raise ValidationError(u'Captcha-ID fehlt - bitte Formular neu laden')

        # Check if this specific captcha exists
        if captcha_id not in form.handler.session['registration_captchas']:
            raise ValidationError(u'Captcha abgelaufen - bitte neu laden')

        captcha_data = form.handler.session['registration_captchas'][captcha_id]

        captcha_answer = field.data.strip() if field.data else ''
        captcha_expected = captcha_data.get('answer', '').strip()

        # Time-based validation: Check if form was submitted too quickly (< 2 seconds)
        try:
            form_loaded = datetime.datetime.strptime(captcha_data['form_loaded'], '%Y-%m-%dT%H:%M:%S.%f')
        except:
            # Fallback for format without microseconds
            try:
                form_loaded = datetime.datetime.strptime(captcha_data['form_loaded'], '%Y-%m-%dT%H:%M:%S')
            except:
                # If we can't parse the time, reject it
                del form.handler.session['registration_captchas'][captcha_id]
                raise ValidationError(u'Captcha-Fehler - bitte neu laden')

        time_elapsed = (datetime.datetime.utcnow() - form_loaded).total_seconds()

        if time_elapsed < 2:
            # Too fast - likely a bot
            # Clear this captcha so a new one is generated
            del form.handler.session['registration_captchas'][captcha_id]
            raise ValidationError(u'Bitte füllen Sie das Formular langsamer aus')

        # Check if captcha is expired (> 30 minutes)
        if time_elapsed > 1800:  # 30 minutes
            # Clear expired captcha so a new one is generated
            del form.handler.session['registration_captchas'][captcha_id]
            raise ValidationError(u'Captcha abgelaufen - bitte neu laden')

        # Validate the captcha answer
        if not captcha_answer:
            raise ValidationError(u'Captcha fehlt')

        if captcha_answer != captcha_expected:
            # Don't delete captcha on wrong answer - let user retry with same question
            raise ValidationError(u'Leider ist die Antwort nicht korrekt')

        # Success - clear this specific captcha from session (single-use)
        del form.handler.session['registration_captchas'][captcha_id]


###
### Custom Registration Handler
###

# Import base handler from userbase
from userbase.handlers.registration import RegistrationHandler as BaseRegistrationHandler

class CamperRegistrationHandler(BaseRegistrationHandler):
    """Custom registration handler that passes handler to form for spam protection"""

    def get(self):
        """show the registration form"""
        cfg = self.module.config
        mod = self.module
        form_class = cfg.registration_form
        obj_class = cfg.user_class

        # Pass handler to form for session access (spam protection)
        form = form_class(self.request.form, module=self.module, handler=self)

        if self.request.method == 'POST':
            if form.validate():
                f = form.data
                user = mod.register(f, create_pw=False)
                if cfg.login_after_registration and not cfg.use_double_opt_in:
                    user = mod.login(self, force=True, **f)
                    self.flash(self._("Welcome, %(fullname)s") %user)
                    url_for_params = cfg.urls.login_success
                    url = self.url_for(**url_for_params)
                    return redirect(url)
                if cfg.use_double_opt_in:
                    self.flash(self._(u'To finish the registration process please check your email with instructions on how to activate your account.') %user)
                    url_for_params = cfg.urls.double_opt_in_pending
                else:
                    self.flash(self._(u'Your user registration has been successful') %user)
                    url_for_params = cfg.urls.registration_success
                url = self.url_for(**url_for_params)
                return redirect(url)
        return self.render(form=form, use_double_opt_in=cfg.use_double_opt_in)

    post = get


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
            registration_form           = EMailRegistrationForm,
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
            }),

            # Custom registration handler for spam protection
            # Note: Python 2.7 doesn't allow colons in keyword args, so we pass via **dict at the end
            **{'handler:register': CamperRegistrationHandler}
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

    jinja_options = {
        'autoescape' : True
    }

    routes = [
        URL('/', 'index', handlers.index.IndexView),
        URL('/past', 'past_barcamps', handlers.index.PastBarcampsView),
        URL('/own', 'own_barcamps', handlers.index.OwnBarcampsView),
        URL('/login_success', 'login_success', handlers.index.LoginSuccess),
        #URL('/robots.txt', 'robots', RobotsTXT),
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
        URL('/u/user_delete', 'user_delete', handlers.users.delete_user.DeleteView),
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

    def handle_exception(self, request, e):
        """Handle all exceptions in the app including those from werkzeug"""
        print "Exception abgefangen: %s (Typ: %s)" % (str(e), type(e).__name__)
        print "Request path: %s, method: %s" % (request.path, request.method)
        
        # Wenn es eine BadRequest-Exception ist und sie durch eine Captcha-Validierung ausgelöst wurde
        if isinstance(e, BadRequest) and str(e) in ["Captcha fehlt", "Leider ist die Antwort nicht korrekt"]:
            print "BadRequest-Exception abgefangen: %s" % str(e)
            
            # Den Request wieder an den ursprünglichen Handler zurückgeben
            url = request.path
            if request.query_string:
                url = url + '?' + request.query_string
            
            print "Leite um zu: %s" % url
            
            # Flash-Nachricht setzen
            request.session.flash(str(e), category="danger")
            return redirect(url)
        
        # Ansonsten die normale Exception-Behandlung nutzen
        return super(CamperApp, self).handle_exception(request, e)
        
    def handle_http_exception(self, request, e):
        """handle http exceptions"""
        print "HTTP Exception: %s (Typ: %s)" % (str(e), type(e).__name__)
        print "Request path: %s, method: %s, code: %s" % (request.path, request.method, getattr(e, 'code', 'unbekannt'))
        
        # Auch hier prüfen, ob es eine BadRequest-Exception ist, die vom Captcha stammt
        if isinstance(e, BadRequest) and str(e) in ["Captcha fehlt", "Leider ist die Antwort nicht korrekt"]:
            print "BadRequest-HTTP-Exception abgefangen: %s" % str(e)
            
            # Den Request wieder an den ursprünglichen Handler zurückgeben
            url = request.path
            if request.query_string:
                url = url + '?' + request.query_string
            
            print "Leite HTTP um zu: %s" % url
            
            # Flash-Nachricht setzen
            request.session.flash(str(e), category="danger")
            return redirect(url)
            
        if e.code != 404:
            print "HTTP error", e.code, request.path

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

from werkzeug.debug import DebuggedApplication

def test_app(config, **local_config):
    """return the app for testing"""
    return CamperApp(__name__, local_config)


def app(config, **local_config):
    """return the config"""
    app = CamperApp(__name__, local_config)
    if app.config.debug:
        return DebuggedApplication(app)
    return app


