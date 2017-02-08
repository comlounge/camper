import jinja2 
from camper.base import BarcampView
import logbook
import uuid 
import datetime
import os
from xhtml2pdf import pisa
from camper import db
from bson import ObjectId
from mongogogo import ObjectNotFound

from email import encoders
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.mime.base import MIMEBase
from email.header import Header





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
        self._ = handler._


    def get_tickets(self, **kwargs):
        """return tickets defined by the query params given"""
        tickets = self.app.config.dbs.tickets
        return tickets.get_tickets(barcamp_id = self.barcamp._id, **kwargs)


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
                workflow = "pending", 
                ticketclass_id = tc_id,
                user_id = uid, 
                barcamp_id = bid)
            ticket = tickets.put(ticket)
            self.log.info("ticket preregistered", ticket = ticket)
            status = "pending"
            self.mail_template("ticket_pending",
                ticket_pdf = None,
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_class = ticket_class,
                barcamp_url = self.handler.url_for("barcamps.index", _full = True, slug = self.barcamp.slug),
                fullname = self.user.fullname
                )
        else:
            ticket = db.Ticket(
                workflow = "confirmed", 
                ticketclass_id = tc_id,
                user_id = uid, 
                barcamp_id = bid)
            ticket = tickets.put(ticket)
            self.log.info("ticket registered", ticket = ticket)
            status = "confirmed"
            #ticket_pdf = self.create_pdf_ticket(ticket, ticket_class, self.user)
            self.mail_template("ticket_welcome",
                ticket_pdf = None,
                view = view,
                barcamp = self.barcamp,
                title = self.barcamp.name,
                ticket_class = ticket_class,
                ticket_url = self.handler.url_for("barcamps.ticketpdf", _full = True, slug = self.barcamp.slug, ticket_id = ticket._id),
                barcamp_url = self.handler.url_for("barcamps.index", _full = True, slug = self.barcamp.slug),
                fullname = self.user.fullname
                )

        # send email to admins            
        if self.barcamp.send_email_to_admins:
            subject = self.handler._('a Ticket was acquired for  %s/%s (%s/%s)') %(tc.name, self.barcamp.name, len(self.barcamp.tickets[tcid]), tc['size'])
            self.send_email_to_admins("admin_ticketbought", tc, subject)

        self.barcamp.save()
        return status

    @property
    def available_ticket_classes(self):
        """return all the ticket classes right now available.

        A class will only be included if:

        - the user does not have a pending or confirmed ticket already
        - the ticket class start and end date match today

        In case a class is full (counting confirmed and pending tickets) we return it
        but set mark it as full so we can disable the checkbox in the view. 

        
        """

        # retrieve amount of tickets for this barcamp and check if it's full
        all_tickets = self.get_tickets(status=['confirmed', 'pending'])
        barcamp_full = len(all_tickets) >= self.barcamp.max_participants
        max_tickets_left = self.barcamp.max_participants - len(all_tickets) # max. number of all available tickets

        ticket_classes = []
        for tc in self.barcamp.ticketlist:

            # compute date (we assume out timezone for now as we don't have tz info on the barcamp)
            now = datetime.date.today()
            if not (tc.start_date <= now <= tc.end_date):
                continue

            tickets_for_class = self.get_tickets(ticketclass_id = tc._id, status=['confirmed', 'pending'])
            tc['full'] = len(tickets_for_class) >= tc.size
            tc['has_ticket'] = False
            # this is used to prevent a user from selecting more tickets than the bc had tickets left
            # see ticket_wizard.html
            tc['max_left'] = max_tickets_left

            # compute "fullness"
            tc['progress'] = len(tickets_for_class) / float(tc.size) * 100
            tc['reserved'] = len(tickets_for_class)
            if barcamp_full:
                tc['tickets_left'] = 0
                tc['full'] = True
            else:                
                tc['tickets_left'] = min(max_tickets_left, tc.size - len(tickets_for_class))
            if self.user:
                uid = self.user._id
                userids = [t.user_id for t in tickets_for_class]
                if unicode(self.user._id) in userids:
                    tc['has_ticket'] = True
                        
            if not tc['has_ticket']:
                ticket_classes.append(tc)
        return ticket_classes
            

    def _check_ticket(self, tc_id, ticket_id):
        """check if a ticket is valid"""

        ticket_class = self.barcamp.get_ticket_class(tc_id)
        if ticket_class is None:
            self.log.error("unknown ticket class", tc_id = tc_id)
            raise TicketClassDoesNotExist()

        ticket_db = self.app.config.dbs.tickets
        try:
            ticket = ticket_db.get(ObjectId(ticket_id))
        except ObjectNotFound:
            self.log.error("unknown ticket id", tc_id = tc_id, ticket_id = ticket_id)
            raise TicketDoesNotExist()

        return ticket_class, ticket

    def approve_ticket(self, tc_id, ticket_id):
        """approve a ticket finished the reservation process and will send the welcome mail"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        if ticket['workflow'] != "pending":
            self.log.error("ticket is not in pending state", ticket = ticket)
            raise TicketError("ticket not in pending state")

        ticket['workflow'] = "confirmed"
        ticket.save()
        self.log.info("ticket approved", ticket = ticket)

        uid = ticket['user_id']
        user = self.userbase.get_user_by_id(uid)
        self.log.debug("found user", uid = uid, email = user.email)

        # send welcome mail
        #ticket_pdf = self.create_pdf_ticket(ticket, ticket_class, user)

        self.mail_template("ticket_confirmed",
            ticket_pdf = None,
            user = user,
            view = self.barcamp_view,
            title = self.barcamp.name,
            ticket_title = ticket_class.name,
            ticket_url = self.handler.url_for("barcamps.ticketpdf", _full = True, slug = self.barcamp.slug, ticket_id = ticket._id),
            barcamp_url = self.handler.url_for("barcamps.index", _full = True, slug = self.barcamp.slug),
            fullname = user.fullname
        )
        return "confirmed"


    def user_cancel_ticket(self, tc_id, ticket_id, reason = ""):
        """user cancels a ticket: store reason and set workflow"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        self.log.debug("canceling ticket", ticket = ticket)
        ticket['workflow'] = "cancel_request"
        ticket['cancel_reason'] = reason
        ticket.save()
        self.log.info("ticket canceled request stored", ticket = ticket)

        uid = ticket['user_id']
        user = self.userbase.get_user_by_id(uid)
        self.log.debug("found user", uid = uid, email = user.email)

        self.send_email_to_user(user, "ticketcancel_receipt", self._('Your Ticket Cancel Request'), ticket)
        self.send_email_to_admins(user, "ticketcancel_request", self._('Ticket Cancel Request'), ticket)

        return



    def cancel_ticket(self, tc_id, ticket_id, reason = ""):
        """cancel a ticket which means deleting it"""

        ticket_class, ticket = self._check_ticket(tc_id, ticket_id)
        self.log.debug("canceling ticket", ticket = ticket)
        ticket['workflow'] = "canceled"
        ticket.save()
        self.log.info("ticket canceled / deleted", ticket = ticket)

        uid = ticket['user_id']
        user = self.userbase.get_user_by_id(uid)
        self.log.debug("found user", uid = uid, email = user.email)

        self.mail_template("ticket_canceled",
            ticket_pdf = None,
            user = user,
            view = self.barcamp_view,
            title = self.barcamp.name,
            ticket_title = ticket_class.name,
            reason = reason,
            ticket_url = self.handler.url_for("barcamps.ticketpdf", _full = True, slug = self.barcamp.slug, ticket_id = ticket._id),
            barcamp_url = self.handler.url_for("barcamps.index", _full = True, slug = self.barcamp.slug),
            fullname = user.fullname
        )

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

    def create_pdf_ticket(self, ticket, ticket_class, user):
        """create a PDF ticket from the ticket data, ticket class and the user object

        returns a PDF string

        """

        mpath = os.path.join("barcamps", "pdfs", "pdfticket.html")
        tmpl = self.app.jinja_env.get_or_select_template("_m/barcamps/pdfs/pdfticket.html")
        html = tmpl.render(
            ticket = ticket,
            user = user,
            ticket_class = ticket_class,
            url_for = self.handler.url_for,
            barcamp = self.barcamp,
            )
        pdf = pisa.CreatePDF(html)
        return pdf.dest.getvalue()


    def mail_template(self, template_name, ticket_pdf = None, send_to=None, user = None, **kwargs):
        """render and send out a mail as normal text"""
        barcamp = self.barcamp
        #barcamp = kwargs.get('barcamp')
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        if barcamp is not None:
            subject = barcamp.mail_templates['%s_subject' %template_name]
            tmpl = jinja2.Template(barcamp.mail_templates['%s_text' %template_name])
            payload = tmpl.render(**kwargs)
            payload = payload.replace('((fullname))', user.fullname)            
            self.send(send_to, subject, payload, ticket_pdf)


    def send(self, send_to, subject, payload, ticket_pdf = None):
        """send a text message with a ticket"""

        msg = MIMEMultipart()

        # compute header
        msg['Subject'] = Header(subject, "utf-8")
        
        from_ = msg['From'] = "%s <%s>" %(self.barcamp.name, self.barcamp.contact_email)
        msg['To'] = send_to

        # create text part
        txt = MIMEText(payload.encode("utf-8"), 'plain', "utf-8")
        msg.attach(txt)

        # only attach ticket if we have one
        if ticket_pdf:

            # create pdf part
            pdfpart = MIMEBase("application", "pdf")
            pdfpart.set_payload(ticket_pdf)
            encoders.encode_base64(pdfpart)
            pdfpart.add_header('Content-Disposition', 'attachment', filename="%s_ticket.pdf" %self.barcamp.slug)

            msg.attach(pdfpart)
            
        mailer = self.app.module_map['mail']
        server = mailer.server_factory()
        server.sendmail(from_, [send_to], msg.as_string())
        server.quit()


    def send_email_to_user(self, user, template_name, subject, ticket):
        """send out notification emails on registration events"""
        
        mailer = self.app.module_map['mail']
        barcamp = self.barcamp
        send_tos = [user.email]
        kwargs = dict(
            user = user,
            barcamp = barcamp,
            ticket = ticket,
            url = self.handler.url_for("barcamps.index", slug = self.barcamp.slug, _full = True),
            mytickets_url = self.handler.url_for("barcamps.mytickets", slug = self.barcamp.slug, _full = True)
        )
        payload = self.handler.render_lang("emails/%s.txt" %template_name, **kwargs)
        mailer.mail(user.email, subject, payload)

    def send_email_to_admins(self, user, template_name, subject, ticket):
        """send out notification emails on registration events"""
        
        mailer = self.app.module_map['mail']
        barcamp = self.barcamp
        new_user = self.user # user registering
        for admin in self.barcamp.admin_users:
            send_tos = [admin.email]
            kwargs = dict(
                new_user = new_user,
                user = admin,
                ticket = ticket,
                barcamp = barcamp,
                url = self.handler.url_for("barcamps.index", slug = self.barcamp.slug, _full = True),
                notification_url = self.handler.url_for("barcamps.edit", slug = self.barcamp.slug, _full = True),
                ticketlist_url = self.handler.url_for("barcamps.admin_ticketlist", slug = self.barcamp.slug, _full = True)
            )
            payload = self.handler.render_lang("emails/%s.txt" %template_name, **kwargs)
            mailer.mail(admin.email, subject, payload)




