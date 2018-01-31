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

class LegalEditForm(BaseForm):
    """legal edit form"""

    contact_email       = TextField(T("Contact E-Mail"), [validators.Length(max=200), validators.Email()], description=T("an email address under which a barcamp admin can be contacted. This address will be publically displayed."))
    imprint             = WYSIWYGField(T("Imprint"), [validators.Required(), validators.Length(min=50, max=20000)], description=T("Please describe in detail who is responsible for this barcamp. This is mandatory for paid barcamps."))
    tos                 = WYSIWYGField(T("Terms of Service"), [validators.Length(min=50, max=20000)], description=T("Please enter your terms of service here."))
    cancel_policy       = WYSIWYGField(T("Cancellation Policy"), [validators.Length(min=50, max=20000)], description=T("Please describe your cancellation policy (make sure it complies to your local law)."))


class LegalEditView(BarcampBaseHandler):
    """an index handler"""

    template = "admin/legaledit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        obj = copy.copy(self.barcamp)
        form = LegalEditForm(self.request.form, obj = self.barcamp, config = self.config)
        if self.barcamp.paid_tickets:
            for field in form:
                form[field.name].validators.append(validators.Required())
        else:
            for field in form:
                form[field.name].validators.append(validators.Optional())
                

        if self.request.method == 'POST' and form.validate():
            
            f = form.data


            # update it so we have the new data for comparison
            self.barcamp.update(f)
            self.barcamp.put()
            self.flash(self._("The barcamp has been updated."), category="info")
            return redirect(self.url_for("barcamps.legaledit", slug = self.barcamp.slug))

        return self.render(form = form, bcid = str(self.barcamp._id))
    
    post = get
