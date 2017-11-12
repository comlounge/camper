#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper.handlers.forms import *
import werkzeug.exceptions
from wtforms import *
import wtforms.widgets
from sfext.babel import T
from .base import BarcampBaseHandler
from camper.handlers.forms import *
import uuid

from camper.services import * 
from bson import ObjectId

    

class TicketList(BarcampBaseHandler):
    """handles confirming and canceling tickets"""

    template = "admin/ticketlist.html"

    LOGGER = "ticketlist"

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""

        tickets = self.config.dbs.tickets
        userbase = self.app.module_map.userbase

        ticket_classes = self.barcamp.ticketlist
        for tc in ticket_classes:
            for status in ['pending', 'confirmed', 'canceled', 'cancel_request']:
                tc[status] = tickets.get_tickets(
                    barcamp_id = self.barcamp._id,
                    ticketclass_id = tc._id,
                    status = status)
                # compute users
                uids = [t.user_id for t in tc[status]]
                users = userbase.get_users_by_ids(uids)
                userdict = {}
                for user in users:
                    userdict[str(user._id)] = user
                for ticket in tc[status]:
                    ticket['user'] = userdict[ticket.user_id]

        # make sure we are supposed to be shown
        if not self.barcamp.ticketmode_enabled:
            self.flash(self._('Ticketing Mode not enabled.'), category="danger")
            return redirect(self.url_for("barcamps.admin_ticketeditor", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            ticket_classes = ticket_classes,
            title = self.barcamp.name)


    @ensure_barcamp()
    @asjson()
    @is_admin()
    def post(self, slug = None, eid = None):
        """handle ticket cancels and confirmations

    
        """
        uid = self.request.form.get("uid")
        status = self.request.form.get("status") # can be join, maybe, notgoubg
        tc_id = self.request.form.get("tc_id") # ticket class
        ticket_id = self.request.form.get("tid")

        self.log.debug("processing ticket action", form = self.request.form.to_dict())
        ticketservice = TicketService(self, self.user)
        
        if status == "approve":
            self.log.debug("approving ticket")
            ticketservice.approve_ticket(tc_id, ticket_id)
        elif status == "cancel":
            self.log.debug("canceling ticket")
            try:
                ticketservice.cancel_ticket(tc_id, ticket_id)
            except TicketError, e:
                print "oops", e
                self.log.exception("an error occurred during canceling the ticket")
                return {'status' : 'error', 'reload' : False, 'msg' : self._('An error occurred while canceling the ticket')}
            except Exception, e:
                print "oops again", e
        return {'status' : 'success', 'reload' : True}




class CancelForm(BaseForm):
    """form for adding a new ticket class"""

    reason         = TextAreaField(T(u"Reason"), [validators.Required(), validators.Length(max=10000)],
                description = T(u'Please give a reason for canceling here.'),
    )
    
class TicketCancel(BarcampBaseHandler):
    """handles canceling a ticket"""

    template = "admin/ticketcancel.html"
    LOGGER = "ticketcancel"


    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def get(self, slug, ticket_id):
        """show the form"""

        form = CancelForm(self.request.form, config = self.config)

        # retrieve ticket
        ticket_db = self.app.config.dbs.tickets
        try:
            ticket = ticket_db.get(ObjectId(ticket_id))
        except ObjectNotFound:
            self.log.error("unknown ticket id", ticket_id = ticket_id)
            raise werkzeug.exceptions.NotFound()

        if self.request.method=="POST":
            if form.validate():
                ticketservice = TicketService(self, self.user)
                ticketservice.cancel_ticket(ticket.ticketclass_id, ticket_id, reason = form.data['reason'])
                self.flash(self._('Ticket canceled.'), category="danger")
                return redirect(self.url_for('barcamps.admin_ticketlist', slug = slug))

        # get ticket class
        tc_id = ticket.ticketclass_id
        ticket_class = self.barcamp.get_ticket_class(tc_id)
        if ticket_class is None:
            self.log.error("unknown ticket class", tc_id = tc_id)
            raise werkzeug.exceptions.NotFound()

        # retrieve user
        uid = ticket['user_id']
        userbase = self.app.module_map['userbase']
        user = userbase.get_user_by_id(uid)



        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            ticket = ticket,
            ticket_class = ticket_class,
            form = form,
            user = user,
            title = self.barcamp.name,
            **self.barcamp)


    post = get



class TicketResend(BarcampBaseHandler):
    """send the welcome mail again"""

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def post(self, slug, ticket_id):
        """show the form"""

        ticketservice = TicketService(self, self.user)
        ticketservice.send_welcome_mail(ticket.ticketclass_id, ticket_id)
        self.flash(self._('Welcome mail send to user.'), category="info")
        return redirect(self.url_for('barcamps.admin_ticketlist', slug = slug))
