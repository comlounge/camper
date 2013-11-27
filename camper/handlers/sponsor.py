from starflyer import Handler, redirect, asjson, redirect
from camper import BaseForm, db, logged_in, BaseHandler
from wtforms import *
from sfext.babel import T

class ContactForm(BaseForm):
    """form for contacting regarding barcamp sponsorship"""
    name                = TextField(T(u"Your Name"), [validators.Length(max=300), validators.Required()],)
    email               = TextField(T(u"Your E-Mail address"), [validators.Email(), validators.Length(max=300), validators.Required()],
                            description=T(u'please enter your email address so we can contact you')
    )
    title               = TextField(T(u"Name of the proposed youth barcamp"), [validators.Length(max=300), validators.Required()],)
    date                = TextField(T(u"Planned date of barcamp"), [validators.Length(max=300), validators.Required()],)
    reason              = TextAreaField(T(u"Reason for sponsorship"), [validators.Required()],
                        description = T(u'please describe your barcamp here esp. in regards of youth participation'),
    )

class SponsorContactView(BaseHandler):
    """show the contact form"""

    template = "sponsoring.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = ContactForm(self.request.form, config = self.config)
        print form.validate()
        if self.request.method == 'POST' and form.validate():
            f = form.data
            send_to = self.app.config.sponsor_bc_notification_addr
            from_addr = f['email']
            if send_to:
                mailer = self.app.module_map['mail']
                payload = self.render_lang("emails/new_sponsorship.txt", **f)
                subject = self._("camper: new barcamp sponsorshop requested")
                mailer.mail(send_to, subject, payload)
                self.flash(self._(u"your sponsorship request has been sent and we will come back to you shortly."))
                url = self.url_for("index")
                return redirect(url)
        return self.render(form = form, slug = None)
    post = get
            
