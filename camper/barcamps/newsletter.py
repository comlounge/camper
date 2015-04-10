#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from camper.handlers.forms import BooleanValueField, checkbox_button
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
import requests
from camper import utils

class MultiCheckboxField(SelectMultipleField):
    """
    A multiple-select, except displays a list of checkboxes.

    Iterating the field will produce subfields, allowing custom rendering of
    the enclosed checkbox fields.
    """
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()


class NewsletterForm(BaseForm):
    """form for creating a newsletter"""
    # base data
    subject = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )
    body    = TextAreaField(T("Newsletter body"), [validators.Required()],
                #description = T('please describe your barcamp here'),
    )
    recipients = MultiCheckboxField(T("Recipients"), [validators.Required()],
        choices = [("participants", T("Participants")), ("subscribers", T("People interested")), ("waitinglist", T("People on Waiting List"))])
    testmail = TextField(T("E-Mail address for testing the newsletter"),
                description = T('put your own e-mail address here in order to send the newsletter to this address for testing purposes'),
    )

class NewsletterEditView(BarcampBaseHandler):
    """let the admin create and send a newsletter"""

    template = "send_newsletter.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = NewsletterForm(self.request.form, config = self.config, recipients = "all")
        if self.request.method == 'POST' and form.validate():
            f = form.data
            mailer = self.app.module_map['mail']
            if self.request.form.has_key('send_test_mail'):
                if f['testmail'] != u'':
                    # send newsletter to test mail address
                    mailer.mail(f['testmail'], f['subject'], f['body'])
                    self.flash("Newsletter Test-E-Mail versandt", category="info")
                else:
                    self.flash("Bitte geben Sie eine Test-E-Mail-Adresse an", category="warning")
                return self.render(
                            view = self.barcamp_view,
                            barcamp = self.barcamp,
                            title = self.barcamp.name,
                            form = form,
                            **self.barcamp
                        )
            elif self.request.form.has_key('send_newsletter'):
                # send newsletter to recipients
                recipient_ids = []

                if 'subscribers' in f['recipients']:
                    recipient_ids = recipient_ids + self.barcamp.subscribers
                if 'participants' in f['recipients']:
                    recipient_ids = recipient_ids + self.barcamp.event.participants
                if 'waitinglist' in f['recipients']:
                    recipient_ids = recipient_ids + self.barcamp.event.waiting_list

                # filter out duplicates by making it a set
                recipient_ids = set(recipient_ids)

                # convert ids to users and send out the mails one by one
                users = self.app.module_map['userbase'].get_users_by_ids(recipient_ids)
                for user in users:
                    send_to = user.email
                    mailer.mail(send_to, f['subject'], f['body'])
                self.flash(self._("newsletter sent successfully"), category="info")
                return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp
        )

    post = get












