import jinja2 
from camper.base import BarcampView
import logbook
import uuid 
from camper import db


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

class TicketDoesNotExist(TicketError):
    """a ticket to be processed does not exist"""

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
        self.userbase = self.app.module_map['userbase']
        self.user = user
        self.log = logbook.Logger(self.LOGGER)


    def get_tickets_for_user(self, user_id, status="confirmed"):
        """retrieve a list of tickets based on user id and a status"""
        tickets = self.app.config.dbs.tickets
        return tickets.get_tickets(barcamp_id = self.barcamp._id, user_id = user_id, status = status)

    def register(self, tc_id, new_user = False):
        """register a ticket for a user

        :param tcid:        the ticket class id the user wants to register for
        :param new_user:    ``True`` if we have a new user

        """

        tickets = self.app.config.dbs.tickets
        bid = self.barcamp._id

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
        user_tickets = tickets.get_tickets(
            barcamp_id = bid,
            user_id = uid, 
            ticketclass_id = tc_id, 
            status = ['confirmed', 'pending'])

        if len(user_tickets):
            raise UserAlreadyRegistered("User owns a ticket already", tc_id = tc_id)

        # is the ticket class full
        all_tickets = tickets.get_tickets(
            barcamp_id = bid,
            user_id = uid, 
            ticketclass_id = tc_id, 
            status = ['confirmed', 'pending'])

        if len(all_tickets) >= ticket_class.size:
            raise TicketClassFull("the ticket class is full", tc_id = tc_id)

        # everything seems to be ok, register the user depending on the barcamp settings
        view = self.barcamp_view
        if preregistration:
            ticket = db.Ticket(
                status="pending", 
                ticketclass_id = tc_id,
                user_id = uid, 
                barcamp_id = bid)
            ticket = tickets.put(ticket)
            self.log.info("ticket preregistered", ticket = ticket)
            status = "pending"
            self.mail_template("onwaitinglist",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_class = ticket_class,
                ticket = ticket,
                **self.barcamp)
        else:
            ticket = db.Ticket(
                status="pending", 
                ticketclass_id = tc_id,
                user_id = uid, 
                barcamp_id = bid)
            ticket = tickets.put(ticket)
            self.log.info("ticket registered", ticket = ticket)
            status = "confirmed"
            self.mail_template("welcome",
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_class = ticket_class,
                ticket = ticket,
                **self.barcamp)

        # send email to admins            
        if self.barcamp.send_email_to_admins:
            subject = self.handler._('a Ticket was acquired for  %s/%s (%s/%s)') %(tc.name, self.barcamp.name, len(self.barcamp.tickets[tcid]), tc['size'])
            self.send_email_to_admins("admin_ticketbought", tc, subject)

        self.barcamp.save()
        return status


    def _check_ticket(self, tc_id, ticket_id):
        """check if a ticket is valid"""

        ticket_class= self.barcamp.get_ticket_class(tc_id)
        if ticket_class is None:
            self.log.error("unknown ticket class", tc_id = tc_id)
            raise TicketClassDoesNotExist()

        if ticket_id not in self.barcamp.tickets[tc_id]:
            self.log.error("unknown ticket id", tc_id = tc_id, ticket_id = ticket_id)
            raise TicketDoesNotExist()

        ticket = self.barcamp.tickets[tc_id][ticket_id]

        return ticket_class, ticket


    def approve_ticket(self, tc_id, ticket_id):
        """approve a ticket finished the reservation process and will send the welcome mail"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        if ticket['status'] != "pending":
            self.log.error("ticket is not in pending state", ticket = ticket)
            raise TicketError("ticket not in pending state")

        # now confirm the ticket
        self.barcamp.tickets[tc_id][ticket_id]['status'] = "confirmed"
        self.barcamp.save()

        self.log.info("ticket approved", ticket = ticket)

        uid = ticket['user_id']
        user = self.userbase.get_user_by_id(uid)
        self.log.debug("found user", uid = uid, email = user.email)

        # send welcome mail
        self.mail_template("welcome",
            user = user,
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            ticket_title = ticket_class.name,
            **self.barcamp)
        return "confirmed"


    def cancel_ticket(self, tc_id, ticket_id):
        """cancel a ticket which means deleting it"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        self.log.debug("canceling ticket", ticket = ticket)
        self.barcamp.tickets[tc_id][ticket_id]['status'] ="canceled"
        self.barcamp.save()
        self.log.info("ticket canceled / deleted", ticket = ticket)

        # do we have to send an email?
        return


    def submit_cancel(self, tc_id, ticket_id, reason = "", email = ""):
        """remember a cancel request for the ticket"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        ticket['reason'] = "reason"
        ticket['email'] = "email"
        ticket['status'] = "cancel-request"

        self.barcamp.tickets[tc_id][ticket_id] = ticket
        self.barcamp.save()
        self.log.info("ticket cancel request recorded", ticket = ticket)


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


            




