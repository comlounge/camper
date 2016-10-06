from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
from cStringIO import StringIO
import datetime

class RegistrationWizard(BarcampBaseHandler):
    """one screen for all of the registration

    Handles:

    - optional a user registration form for users not being logged in
    - the registration data form
    - the 

    """
    template = 'registration_wizard.html'

    @property
    def registration_form(self):
        """create and return the registration form"""

        class RegistrationForm(BaseForm):
            pass

        for field in self.barcamp.registration_form:
            vs = []
            if field['required']:
                vs.append(validators.Required())
            if field['fieldtype'] == "textfield":
                vs.append(validators.Length(max = 400))
                setattr(RegistrationForm, field['name'], TextField(field['title'], vs, description = field['description']))
            elif field['fieldtype'] == "textarea":
                vs.append(validators.Length(max = 2000))
                setattr(RegistrationForm, field['name'], TextAreaField(field['title'], vs, description = field['description']))

        # retrieve existing data if user is logged in
        if self.logged_in:
            uid = unicode(self.user._id)
            form_data = self.barcamp.registration_data.get(uid, {})
        else:
            form_data = {}

        return RegistrationForm(self.request.form, prefix="bcdata", config = self.config, **form_data)

    @property
    def user_registration_form(self):
        """return the userbase registration form"""

        cfg = self.app.module_map['userbase'].config
        mod = self.app.module_map['userbase']
        form = cfg.registration_form
        obj_class = cfg.user_class

        form = form(self.request.form, module = mod)
        return form



    @ensure_barcamp()
    def get(self, slug = None):
        """show the complete registration form with registration data, user registration and more"""

        regform = self.registration_form

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = regform,
            userform = self.user_registration_form,
            **self.barcamp)

class EMailValidation(BaseHandler):
    """utility handler for checking it an email exists already"""

    def get(self, slug=None):
        """check if a user with this email exists"""
        email = self.request.args.get("email", "cd7cs78cd6")
        user = self.app.module_map.userbase.get_user_by_email(email)
        print email
        print user
        if user is None:
            raise werkzeug.exceptions.NotFound()
        return "ok"




