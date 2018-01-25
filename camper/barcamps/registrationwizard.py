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

from camper.services import RegistrationService, RegistrationError

class ProcessingError(Exception):
    """marker expception for the process post method"""

    def __init__(self, msg = ""):
        self.msg = msg

    def __repr__(self):
        return "<ProcessingError: %s>" %self.msg


class RegistrationWizard(BarcampBaseHandler):
    """one screen for all of the registration

    Handles:

    - optional a user registration form for users not being logged in
    - the registration data form
    - the 

    """
    template = 'registration_wizard.html'

    LOGGER = "registration"

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
                setattr(RegistrationForm, field['name'], TextField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "textarea":
                vs.append(validators.Length(max = 2000))
                setattr(RegistrationForm, field['name'], TextAreaField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "select":
                setattr(RegistrationForm, field['name'], SelectField(field['title'], vs, description = field['description'] or " ", 
                    choices = field['choices']))
            elif field['fieldtype'] == "checkbox":
                setattr(RegistrationForm, field['name'], BooleanField(field['title'], vs, description = field['description'] or " "))


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


    def process_post_data(self):
        """process all the incoming data. raises ProcessingError in case there is a failure.
        This method should only be called on post"""

        # unfortunately it's doubled here. 
        regform = self.registration_form
        userform = self.user_registration_form

        if not self.logged_in and not userform.validate():
            raise ProcessingError("user is not logged in and userform does not validate")

        if not regform.validate():
            raise ProcessingError("registration form does not validate")
        
        # do we have events? If not then this is not valid
        eids = self.request.form.getlist("_bcevents")
        if not eids:
            raise ProcessingError("no events selected")


        # do we have a new user?
        new_user = not self.logged_in
        if not self.logged_in:

            # create new user and get the UID
            mod = self.app.module_map['userbase']
            user = mod.register(userform.data, create_pw = False)

            # double opt in should be done already, we only have to remember
            # to tell the user after registration
            uid = unicode(user._id)
            self.log.debug("created new user", uid=uid)

        else:
            uid = unicode(self.user._id)


        # store registration details
        self.barcamp.registration_data[uid] = regform.data

        # register for all the selected events
        if self.logged_in:
            reg = RegistrationService(self, self.user)

            for eid in eids:
                event = self.barcamp.get_event(eid)
                try:
                    reg.set_status(eid, "going")
                except RegistrationError, e:
                    self.log.exception("a registration error occurred")
                    raise ProcessingError(str(e))
                    return 
        else:
            # for new users we just remember the eids
            user.registered_for = {
                'barcamp' : self.barcamp.slug,
                'eids' : eids,
            }
            user.save()
            self.log.debug("saving user information on new user", info = user.registered_for)

        self.barcamp.save()
        


    @ensure_barcamp()
    def get(self, slug = None):
        """show the complete registration form with registration data, user registration and more"""

        # show tickets instead if ticketmode is enabled
        if self.barcamp.ticketmode_enabled:
            return redirect(self.url_for(".tickets", slug=slug))
        
        regform = self.registration_form
        userform = self.user_registration_form
                
        if self.request.method == "POST":
            try:
                self.process_post_data()
            except ProcessingError, e:
                self.flash(self._("Unfortunately an error occurred when trying to register you. Please try again or contact the barcamptools administrator."), category="danger")
                print "error on processing post data", e
            else:
                if self.logged_in:
                    self.flash(self._("You have been successfully registered. Please check your email."), category="success")
                    return redirect(self.url_for(".user_events", slug = self.barcamp.slug))
                else:
                    self.flash(self._("In order to finish your registration you have to activate your account. Please check your email."), category="success")
                    return redirect(self.url_for(".index", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = regform,
            userform = userform,
            **self.barcamp)

    post = get

class EMailValidation(BaseHandler):
    """utility handler for checking if an email exists already"""

    def get(self, slug=None):
        """check if a user with this email exists"""
        email = self.request.args.get("email", "cd7cs78cd6")
        user = self.app.module_map.userbase.get_user_by_email(email)
        if user is None:
            raise werkzeug.exceptions.NotFound()
        return "ok"


class LoginRedirect(BaseHandler):
    """remember camefrom and redirect to login page"""


    def get(self, slug = None):
        """create the url, save it and then redirect"""
        url = self.url_for(".wizard", slug = slug)
        self.session['came_from'] = url
        return redirect(self.url_for("userbase.login"))




