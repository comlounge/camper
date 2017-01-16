import jinja2 
from camper.base import BarcampView
import logbook

__all__ = ['TicketError', 'TicketService', 'TicketClassFull', 'TicketClassDoesNotExist', 'UserAlreadyRegistered']

class TicketError(Exception):
    """marker exception for registration errors"""

    def __init__(self, msg="", tc_id = None):
        """initialize the exception

        :param msg: an optional message
        :param tc_id: an optional ticket class id
        """
        self.msg = msg
        self.tc_id = tc_id


class TicketClassDoesNotExist(TicketError):
    """subclass for marking a class does not exist"""

class UserAlreadyRegistered(TicketError):
    """a user already owns a ticket of that class"""

class TicketClassFull(TicketError):
    """tickets for this ticket class are sold out"""


class TicketService(object):
    """service for registering users for barcamps"""

    LOGGER = "ticketservice"


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

    def register(self, tc_id):
        """register a ticket for a user

        :param tcid:    the ticket class id the user wants to register for

        """

        if self.barcamp.workflow != "registration":
            raise RegistrationError("The barcamp is not open for registration yet")

        paid = self.barcamp.paid_tickets
        preregistration = self.barcamp.preregistration

        uid = unicode(self.user._id)
        ticket_class= self.barcamp.get_ticket_class(tc_id)

        # does the ticket class exist
        if ticket_class is None:
            raise TicketClassDoesNotExist("The ticket class does not exist", tc_id = tc_id)

        # does the user own a ticket already?
        tickets_for_class = self.barcamp.tickets.get(tc_id, {})
        if uid in tickets_for_class:
            raise UserAlreadyRegistered("User owns a ticket already", tc_id = tc_id)


        # is the ticket class full
        tc_size = len(tickets_for_class)
        if tc_size >= ticket_class.size:
            raise TicketClassFull("the ticket class is full", tc_id = tc_id)

        # everything seems to be ok, register the user depending on the barcamp settings
        view = self.barcamp_view
        if preregistration:
            self.barcamp.tickets.setdefault(tc_id, {})[uid] = {'user_id' : uid, 'status' : 'pending'}
            self.log.info("ticket preregistered", uid = uid, tc_id = tc_id, status="pending")
            status = "pending"
            self.mail_template("onwaitinglist",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_title = ticket_class.name,
                **self.barcamp)
        else:
            self.barcamp.tickets.setdefault(tc_id, {})[uid] = {'user_id' : uid, 'status' : 'confirmed'}
            self.log.info("ticket registered", uid = uid, tc_id = tc_id, status="confirmed")
            status = "confirmed"
            self.mail_template("welcome",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_title = ticket_class.name,
                **self.barcamp)

        # send email to admins            
        if self.barcamp.send_email_to_admins:
            subject = self.handler._('a Ticket was acquired for  %s/%s (%s/%s)') %(tc.name, self.barcamp.name, len(self.barcamp.tickets[tcid]), tc['size'])
            self.send_email_to_admins("admin_ticketbought", tc, subject)

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


            




