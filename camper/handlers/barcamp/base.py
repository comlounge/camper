#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions

class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")

class BarcampBaseHandler(BaseHandler):
    """extend the base handler for barcamp specific extensions"""

    @property
    def render_context(self):
        """provide more information to the render method"""
        sponsor_form = SponsorForm(self.request.form, config = self.config)
        payload = super(BarcampBaseHandler, self).render_context
        payload['sponsor_form'] = sponsor_form
        payload['view'] = self.barcamp_view
        return payload
