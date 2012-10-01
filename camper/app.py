# coding=utf-8

import pymongo
import yaml
import pkg_resources

from starflyer import Application, URL, AttributeMapper
from sfext.uploader import upload_module
from sfext.mail import mail_module

import userbase
import handlers
import db

#
# custom jinja filters
#

from jinja2 import evalcontextfilter, Markup, escape
import re

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
        'server_name'           : "dev.localhost:9003",
        'title'                 : "Camper - Barcamp Tools",
        'description'           : "barcamp tool",
        'debug'                 : False,
        'mongodb_name'          : "camper",
        'mongodb_port'          : 27017,
        'mongodb_host'          : "localhost",
        'secret_key'            : "7cs687cds6c786cd89&%$%&hhhs8c7zcbs87ct d7stc 8c7cs8 78 7dts 8cs97tugjgjzGUZGUzgcdcg&%%$",
        'session_cookie_domain' : "dev.localhost",
        'smtp_host'             : 'localhost',
        'smtp_port'             : 25,
        'from_addr'             : "noreply@example.org",
        'from_name'             : "Barcamp-Tool",
    }

    modules = [
        userbase.email_userbase(
            url_prefix                  = "/users",
            mongodb_name                = "camper",
            master_template             = "master.html",
            login_after_registration    = False,
            double_opt_in               = True,
            enable_registration         = True,
            urls                        = {
                'activation'            : {'endpoint' : 'userbase.activate'},
                'activation_success'    : {'endpoint' : 'index'},
                'activation_code_sent'  : {'endpoint' : 'userbase.activate'},
                'login_success'         : {'endpoint' : 'index'},
                'logout_success'        : {'endpoint' : 'userbase.login'},
                'registration_success'  : {'endpoint' : 'userbase.login'},
            }
        ),
        upload_module(),
        mail_module(debug=True),
    ]

    jinja_filters = {
        'nl2br' : nl2br,
        'currency' : do_currency,
        'tojson' : _tojson_filter,
    }

    routes = [
        URL('/', 'index', handlers.index.IndexView),
        URL('/', 'login', handlers.index.IndexView),
    ]

    def finalize_setup(self):
        """do our own configuration stuff"""
        self.config.dbs = AttributeMapper()
        mydb = self.config.dbs.db = pymongo.Connection(
            self.config.mongodb_host,
            self.config.mongodb_port
        )[self.config.mongodb_name]


def app(config, **local_config):
    """return the config""" 
    return CamperApp(__name__, local_config)

