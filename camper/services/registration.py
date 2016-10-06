import jinja2 

__all__ = ['RegistrationError', 'RegistrationService']

class RegistrationError(Exception):
    """marker exception for registration errors"""

    def __init__(self, msg):
        self.msg = msg


class RegistrationService(object):
    """service for registering users for barcamps"""

    def __init__(self, handler, user):
        """initialize the service with the app object"""
        self.handler = handler
        self.barcamp = handler.barcamp
        self.app = handler.app
        self.barcamp_view = handler.barcamp_view
        self.user = user

    def set_status(self, eid, status):
        """register a user for an event of a barcamp

        :param eid: The event id of the event to register the user for
        :param status: The status of the user ("going", "waitinglist", "")

        :returns: resulting status of the user
        """

        if self.barcamp.workflow != "registration":
            raise RegistrationError("The barcamp is not open for registration yet")

 
        uid = unicode(self.user._id)
        event = self.barcamp.get_event(eid)

        # do the status change
        status = event.set_status(uid, status)

        # send out emails
        view = self.barcamp_view
        if status=="going":
            self.mail_template("welcome",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                event_title = event.name,
                event_date = event.date.strftime("%d.%m.%Y"),
                **self.barcamp)

        elif status=="waitinglist":
            self.mail_template("onwaitinglist",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                event_title = event.name,
                event_date = event.date.strftime("%d.%m.%Y"),
                **self.barcamp)

        # check if we can fill up the participants from the waiting list
        uids = event.fill_participants()
        users = self.app.module_map.userbase.get_users_by_ids(uids)
        for user in users:
            # send out a welcome email
            self.mail_template("welcome",
                view = view,
                user = user,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                event_title = event.name,
                event_date = event.date.strftime("%d.%m.%Y"),
                **self.barcamp)

        # save the barcamp
        self.barcamp.events[eid] = event
        self.barcamp.save()

        return status
        

    def mail_text(self, template_name, subject, send_to=None, user = None, **kwargs):
        """render and send out a mail as mormal text"""
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        payload = self.render_lang(template_name, **kwargs)
        mailer = self.app.module_map['mail']
        mailer.mail(send_to, subject, payload)


    def mail_template(self, template_name, send_to=None, user = None, **kwargs):
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
            mailer = self.app.module_map['mail']
            mailer.mail(send_to, subject, payload)

