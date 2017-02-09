#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler, LocationNotFound
import requests
import gettext
import pycountry
from camper import utils
from camper.handlers.forms import WYSIWYGField

class SocialEditForm(BaseForm):
    """legal edit form"""

    twitter             = TextField(T("Twitter-Username"), [validators.Length(max=15)], description=T("only the username, max. 15 characters"))
    hashtag             = TextField(T("Twitter-Hashtag"), [validators.Length(max=100)], description=T("max. 100 characters"))
    gplus               = TextField(T("Google Plus URL"), [validators.Length(max=100)], description=T("URL of the Google Plus Profile"))
    facebook            = TextField(T("Facebook URL"), [validators.Length(max=100)], description=T("URL of the Facebook Page"))
    homepage            = TextField(T("Homepage URL"), [validators.Length(max=500)], description=T("link to the homepage of this barcamp in case one exists."))
    seo_description     = TextField(T('Meta Description'), 
                        [validators.Length(max=160)],
                        description=T('The meta description is used for for search engines and often shows up in search results. It should be no more than 160 characters long.'))


class SocialEditView(BarcampBaseHandler):
    """an index handler"""

    template = "admin/socialedit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = SocialEditForm(self.request.form, obj = self.barcamp, config = self.config)

        if self.request.method == 'POST' and form.validate():
            
            f = form.data

            # update it so we have the new data for comparison
            self.barcamp.update(f)
            self.barcamp.put()
            self.flash(self._("The barcamp has been updated."), category="info")
            return redirect(self.url_for("barcamps.socialedit", slug = self.barcamp.slug))

        return self.render(form = form, bcid = str(self.barcamp._id))
    
    post = get
