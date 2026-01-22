# -*- coding: utf-8 -*-
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
import pprint
from cStringIO import StringIO
import datetime

from camper.services import * 


class ProcessingError(Exception):
    """marker expception for the process post method"""

    def __init__(self, msg = ""):
        self.msg = msg

    def __repr__(self):
        return "<ProcessingError: %s>" %self.msg


class TicketWizard(BarcampBaseHandler):
    """one screen for all of the registration

    Handles:

    - optional a user registration form for users not being logged in
    - the registration data form
    - the 

    """
    template = 'ticket_wizard.html'

    LOGGER = "ticketing"

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
            elif field['fieldtype'] == "checkbox":
                setattr(RegistrationForm, field['name'], BooleanField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "select":
                setattr(RegistrationForm, field['name'], SelectField(field['title'], vs, description = field['description'] or " ", 
                    choices = field['choices']))

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

        form = form(self.request.form, module = mod, handler=self)
        return form

    @property
    def terms_form(self):
        """create form for terms of service checkboxes"""
        from camper import BaseForm

        class TermsForm(BaseForm):
            tos_ok = BooleanField(u'Ich habe die AGB gelesen und akzeptiert', [validators.Required(message=u'Sie müssen die AGB akzeptieren')])
            cancel_ok = BooleanField(u'Ich habe die Widerrufs- und Rückerstattungsbedingungen gelesen und akzeptiert', [validators.Required(message=u'Sie müssen die Widerrufs- und Rückerstattungsbedingungen akzeptieren')])

        return TermsForm(self.request.form, prefix="terms")


    def process_post_data(self, regform=None, userform=None, termsform=None):
        """process all the incoming data. raises ProcessingError in case there is a failure.
        This method should only be called on post
        Returns True if validation succeeds, False otherwise.
        """

        # Use provided forms or create new ones (for backwards compatibility)
        if regform is None:
            regform = self.registration_form
        if userform is None:
            userform = self.user_registration_form
        if termsform is None:
            termsform = self.terms_form

        # Validate forms - but don't raise ProcessingError on validation failure
        # This allows field-specific errors to be displayed to the user
        user_valid = self.logged_in or userform.validate()
        reg_valid = regform.validate()

        # Only validate terms form for paid tickets
        if self.barcamp.paid_tickets:
            terms_valid = termsform.validate()
        else:
            terms_valid = True

        if not user_valid:
            return False

        if not reg_valid:
            return False

        if not terms_valid:
            return False
        
        # do we have events? If not then this is not valid
        tc_ids = self.request.form.getlist("_tc")
        if not tc_ids:
            self.log.warn("found no ticket class ids")
            raise ProcessingError("no tickets selected")
        self.log.debug("found ticket class ids", tc_ids = tc_ids)


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
            ticketservice = TicketService(self, self.user)
            for tc_id in tc_ids:
                try:
                    status = ticketservice.register(tc_id, new_user = new_user)
                except TicketError, e:
                    self.log.error("an exception when registering a ticket occurred", error_msg = e.msg)
                    raise ProcessingError(str(e))
                    return 
        else:
            # for new users we just remember the ticket class ids (compared to eids when no ticketing is enabled)
            user.registered_for = {
                'barcamp' : self.barcamp.slug,
                'tickets' : tc_ids,
            }
            user.save()
            self.log.debug("saving user information on new user", info = user.registered_for)

        self.barcamp.save()
        


    @ensure_barcamp()
    def get(self, slug = None):
        """show the complete registration form with registration data, user registration and more"""

        if self.request.method == "POST":
            # Create forms with POST data for validation
            regform = self.registration_form
            userform = self.user_registration_form
            termsform = self.terms_form if self.barcamp.paid_tickets else None

            validation_passed = False
            try:
                # Pass the forms so validation errors are preserved
                result = self.process_post_data(regform=regform, userform=userform, termsform=termsform)
                # If process_post_data returns False, validation failed
                # The form will be re-rendered with field-specific errors
                if result is False:
                    validation_passed = False
                    self.flash(self._("The form contains errors. Please correct them and try again."), category="danger")
                else:
                    validation_passed = True
            except ProcessingError, e:
                self.log.exception()
                self.flash(self._("Unfortunately an error occurred when trying to register you. Please try again or contact the barcamptools administrator."), category="danger")
            else:
                if validation_passed:
                    if self.logged_in:
                        if self.barcamp.paid_tickets:
                            self.flash(self._("Your ticket reservations have been processed. Please check your email for information on how to pay for your ticket."), category="success")
                        else:
                            self.flash(self._("Your ticket reservation was successful."), category="success")
                        return redirect(self.url_for(".mytickets", slug = self.barcamp.slug))
                    else:
                        self.flash(self._("In order to finish your registration you have to activate your account. Please check your email."), category="success")
                        return redirect(self.url_for(".index", slug = self.barcamp.slug))
        else:
            # GET request - create fresh forms
            regform = self.registration_form
            userform = self.user_registration_form
            termsform = self.terms_form if self.barcamp.paid_tickets else None

        # a list of all ticket class objects
        ticketlist = self.barcamp.ticketlist

        ticketservice = TicketService(self, self.user)

        # this will get all the ticket classes with a flag if they are obtainable or not
        # classes not yet active will not be returned.
        available_ticket_classes = [tc for tc in ticketservice.available_ticket_classes if not tc['full']]


        # compute max amount of tickets left for barcamp 
        all_tickets = ticketservice.get_tickets(status=['confirmed', 'pending', 'cancel_request'])
        tickets_left = self.barcamp.max_participants - len(all_tickets)
        
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = regform,
            userform = userform,
            termsform = termsform,
            has_available = available_ticket_classes and tickets_left,
            available = available_ticket_classes,
            tickets_left = tickets_left,
            show_tickets_left = tickets_left < len(available_ticket_classes),
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




