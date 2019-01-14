import jinja2 
from camper.base import BarcampView
import logbook

__all__ = ['MailService']

class MailService(object):
    """service for mailing to users and admins"""

    LOGGER = "mailservice"

    def __init__(self, handler, user, barcamp = None):
        """initialize the service with the app object"""
        self.handler = handler
        if barcamp is None:
            self.barcamp = handler.barcamp
        else:
            self.barcamp = barcamp
        self.app = handler.app
        self.barcamp_view = BarcampView(self.barcamp, handler)
        self.user = user
        self.log = logbook.Logger(self.LOGGER)

    def mail_text(self, template_name, subject, send_to=None, user = None, **kwargs):
        """render and send out a mail as mormal text"""
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        payload = self.render_lang(template_name, **kwargs)
        mailer = self.app.module_map['mail']
        mailer.mail(send_to, subject, payload)


    def mail_template(self, template_name, send_to=None, user = None, event_title="", **kwargs):
        """render and send out a mail as normal text"""
        barcamp = kwargs.get('barcamp')
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        if barcamp is not None:
            subject = barcamp.mail_templates['%s_subject' %template_name]
            tmpl = jinja2.Template(barcamp.mail_templates['%s_text' %template_name])
            kwargs['fullname'] = user.fullname
            payload = tmpl.render(**kwargs)
            payload = payload.replace('((fullname))', user.fullname)
            payload = payload.replace('((event_title))', event_title)
            mailer = self.app.module_map['mail']
            mailer.mail(send_to, subject, payload)

    def send_email_to_admins(self, template_name, subject, **kw):
        """send out notification emails on certain events"""
        
        mailer = self.app.module_map['mail']
        barcamp = self.barcamp
        new_user = self.user # active user
        for admin in self.barcamp.admin_users:
            print admin
            send_tos = [admin.email]
            kwargs = dict(
                new_user = new_user,
                user = admin,
                barcamp = barcamp,
                url = self.handler.url_for("barcamps.index", slug = self.barcamp.slug, _full = True),
                notification_url = self.handler.url_for("barcamps.edit", slug = self.barcamp.slug, _full = True)
            )
            kwargs.update(kw)
            payload = self.handler.render_lang("emails/%s.txt" %template_name, **kwargs)
            mailer.mail(admin.email, subject, payload)


        




