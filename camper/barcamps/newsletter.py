#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from camper.handlers.forms import MultiCheckboxField
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
import requests
from camper import utils


class NewsletterForm(BaseForm):
    """form for creating a newsletter"""
    # base data
    subject = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )
    body    = TextAreaField(T("Newsletter body"), [validators.Required()],
                #description = T('please describe your barcamp here'),
    )

    testmail = TextField(T("E-Mail address for testing the newsletter"),
                description = T('put your own e-mail address here in order to send the newsletter to this address for testing purposes'),
    )

class NewsletterEditView(BarcampBaseHandler):
    """let the admin create and send a newsletter"""

    template = "admin/send_newsletter.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
            
        class MyForm(NewsletterForm):
            """internal subclass we can add to"""
            pass

        
        # only add recipients for non ticket mode
        # otherwise we send to all ticket owners
        if not self.barcamp.ticketmode_enabled: 
            MyForm.recipients = MultiCheckboxField(self._("Recipients"), [validators.Required()],
                choices = [
                    ("participants",self._("Participants (going)")), 
                    ("maybe",self._("People who might come (maybe)")), 
                    ("waitinglist",self._("People on Waiting List"))
                ],
                default = ['participants', 'waitinglist']
            )

        # now instantiate it
        form = MyForm(self.request.form, config = self.config, recipients = "all")

        if self.request.method == 'POST' and form.validate():
            f = form.data
            mailer = self.app.module_map['mail']
            st = self.request.form.get('sendtype')
            if st=="test":
                if f['testmail'] != u'':
                    # send newsletter to test mail address
                    print "sending test mail"
                    print type(self.barcamp.name)
                    mailer.mail(f['testmail'], f['subject'], f['body'], from_name=self.barcamp.name.encode("utf8"))
                    self.flash("Newsletter Test-E-Mail versandt", category="info")
                else:
                    self.flash("Bitte geben Sie eine Test-E-Mail-Adresse an", category="waring")
                return self.render(
                            view = self.barcamp_view,
                            barcamp = self.barcamp,
                            title = self.barcamp.name,
                            form = form,
                            **self.barcamp
                        )
            elif st=="live":
                # send newsletter to recipients
                recipient_ids = []
                
                if self.barcamp.ticketmode_enabled:
                    tickets = self.app.config.dbs.tickets
                    # all the confirmed tickets
                    tickets = tickets.get_tickets(barcamp_id = self.barcamp._id)
                    recipient_ids = [t.user_id for t in tickets]
                else:
                    if "subscribers" in f['recipients']:
                        recipient_ids = self.barcamp.subscribers
                    if "participants" in f['recipients']:
                        # collect all the participants from all event
                        for event in self.barcamp.eventlist:
                            recipient_ids = recipient_ids + event.participants
                    if 'waitinglist' in f['recipients']:
                        for event in self.barcamp.eventlist:
                            recipient_ids = recipient_ids + event.waiting_list
                    if 'maybe' in f['recipients']:
                        for event in self.barcamp.eventlist:
                            recipient_ids = recipient_ids + event.maybe

                # unduplicate the list
                recipient_ids = set(recipient_ids)
                print "sending to", recipient_ids
                users = self.app.module_map['userbase'].get_users_by_ids(recipient_ids)
                for user in users:
                    send_to = user.email
                    mailer.mail(send_to, f['subject'], f['body'], from_name=self.barcamp.name.encode("utf8"))
                self.flash(self._("newsletter sent successfully"), category="info")
                return redirect(self.url_for("barcamps.dashboard", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp
        )

    post = get












