import jinja2 
from camper.base import BarcampView

__all__ = ['RegistrationError', 'RegistrationService']

class RegistrationError(Exception):
    """marker exception for registration errors"""

    def __init__(self, msg):
        self.msg = msg


class RegistrationService(object):
    """service for registering users for barcamps"""

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

    def set_status(self, eid, status, force = False):
        """register a user for an event of a barcamp

        :param eid: The event id of the event to register the user for
        :param status: The status of the user ("going", "waitinglist", "")
        :param force: if ``True`` then users can be added to the participants list even when full

        :returns: resulting status of the user
        """

        if self.barcamp.workflow != "registration":
            raise RegistrationError("The barcamp is not open for registration yet")
 
        uid = unicode(self.user._id)
        event = self.barcamp.get_event(eid)
        was_going = uid in event.participants # for sending out the unregister notification
        was_on_waitinglist = uid in event.waiting_list 

        # do the status change
        status = event.set_status(uid, status, force)

        # send out emails
        view = self.barcamp_view
        if status == "going":
            if was_on_waitinglist:
                self.mail_template("fromwaitinglist",
                    view = view,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    event_title = event.name,
                    event_date = event.date.strftime("%d.%m.%Y"),
                    **self.barcamp)
            else:
                self.mail_template("welcome",
                    view = view,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    event_title = event.name,
                    event_date = event.date.strftime("%d.%m.%Y"),
                    **self.barcamp)

            if self.barcamp.send_email_to_admins:
                subject = self.handler._('New registration for %s/%s (%s/%s)') %(event.name, self.barcamp.name, len(event.participants), event.size)
                self.send_email_to_admins("admin_new_registration", event, subject)
                

        elif status == "waitinglist":
            self.mail_template("onwaitinglist",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                event_title = event.name,
                event_date = event.date.strftime("%d.%m.%Y"),
                **self.barcamp)

            if self.barcamp.send_email_to_admins:
                subject = self.handler._('New user on waiting list for %s/%s (%s/%s)') %(event.name, self.barcamp.name, len(event.participants), event.size)
                self.send_email_to_admins("admin_waitinglist", event, subject)

        elif was_going and status != "going":
            if self.barcamp.send_email_to_admins:
                subject = self.handler._('Cancellation for %s/%s (%s/%s)') %(event.name, self.barcamp.name, len(event.participants), event.size)
                self.send_email_to_admins("admin_cancelled_registration", event, subject)


        # do we have to move people from the waitinglist?
        self.check_waitinglist(event)
        
        # save the barcamp
        self.barcamp.events[eid] = event
        self.barcamp.save()

        return status


    def check_waitinglist(self, event):
        """check if we need to move people from the waiting list to participants.

        This can be called e.g. if you change the number of max participants for an event

        The barcamp is not saved and neither is the event. You maybe want to use this code
        to do it:
            self.barcamp.events[eid] = event
            self.barcamp.save()

        :param event: the event object for which to check the list
        :return uids: list of user ids moved
        """
        eid = event._id
        uids = event.fill_participants() # returns the uids which have been moved
        users = self.app.module_map.userbase.get_users_by_ids(uids)

        for user in users:
            # send out a welcome email
            self.mail_template("fromwaitinglist",
                view = self.barcamp_view,
                user = user,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                event_title = event.name,
                event_date = event.date.strftime("%d.%m.%Y"),
                **self.barcamp)
        return uids

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

    def send_email_to_admins(self, template_name, event, subject):
        """send out notification emails on registration events"""
        
        mailer = self.app.module_map['mail']
        barcamp = self.barcamp
        new_user = self.user # user registering
        for admin in self.barcamp.admin_users:
                send_tos = [admin.email]
                kwargs = dict(
                    new_user = new_user,
                    user = admin,
                    barcamp = barcamp,
                    event = event,
                    url = self.handler.url_for("barcamps.index", slug = self.barcamp.slug, _full = True),
                    notification_url = self.handler.url_for("barcamps.edit", slug = self.barcamp.slug, _full = True)
                )
                payload = self.handler.render_lang("emails/%s.txt" %template_name, **kwargs)
                mailer.mail(admin.email, subject, payload)


            




