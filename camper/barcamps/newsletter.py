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


class NewsletterForm(BaseForm):
    """form for creating a newsletter"""
    # base data
    subject = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )
    body    = TextAreaField(T("Newsletter body"), [validators.Required()],
                #description = T('please describe your barcamp here'),
    )
    participants = BooleanValueField("Participants", widget=checkbox_button,
                default=True,
    )
    subscribers = BooleanValueField("Subscribers", widget=checkbox_button
    )
    testmail = TextField(T("Test mail"),
                #description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )

class NewsletterEditView(BarcampBaseHandler):
    """let the admin create and send a newsletter"""

    template = "send_newsletter.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = NewsletterForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            mailer = self.app.module_map['mail']
            if self.request.form.has_key('send_test_mail'):
                if f['testmail'] != u'':
                    # send newsletter to test mail address
                    mailer.mail(f['testmail'], f['subject'], f['body'])
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
            elif self.request.form.has_key('send_newsletter'):
                # send newsletter to recipients
                recipient_ids = []
                if f['subscribers']:
                    recipient_ids += self.barcamp.subscribers
                if f['participants']:
                    recipient_ids += self.barcamp.event.participants
                users = self.app.module_map['userbase'].get_users_by_ids(recipient_ids)
                send_to = self.user.email
                cc = [u.email for u in users]
                mailer.mail(send_to, f['subject'], f['body'], cc=cc)
                self.flash("Newsletter erfolgreich versandt", category="info")
                return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp
        )

    post = get












