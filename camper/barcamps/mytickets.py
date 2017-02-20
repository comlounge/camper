from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper import aspdf2
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
from cStringIO import StringIO
import datetime
from bson import ObjectId
from sfext.babel import T
from camper.services import * 
from mongogogo import ObjectNotFound




class MyTickets(BarcampBaseHandler):
    """screen showing your own tickets which you can view and cancel
    """

    template = 'mytickets.html'

    LOGGER = "mytickets"


    @ensure_barcamp()
    @logged_in()
    def get(self, slug = None):
        """show tickets for a user"""
        if not self.barcamp.ticketmode_enabled:
            self.log.warn("my tickets was called although ticketing was disabled", slug = slug)
            return redirect(self.url_for(".index", slug = self.barcamp.slug))

        
        # a list of all ticket class objects
        ticketlist = self.barcamp.ticketlist
        ticketservice = TicketService(self, self.user)                
        
        pending = ticketservice.get_tickets_for_user(self.user_id, "pending")
        cancel_request = ticketservice.get_tickets_for_user(self.user_id, "cancel_request")
        canceled = ticketservice.get_tickets_for_user(self.user_id, "canceled")
        confirmed = ticketservice.get_tickets_for_user(self.user_id, "confirmed")
        reserved_tickets = pending + confirmed
        
        all_tickets = [tc._id for tc in ticketlist]
        reserved_ticket_ids = [t.ticketclass_id for t in reserved_tickets]

        # compute the remaining tickets for a user
        remaining_ticket_ids= list(set(all_tickets) - set(reserved_ticket_ids))
    
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            pending = pending,
            cancel_request = cancel_request,
            canceled = canceled,
            confirmed = confirmed,
            remaining = len(remaining_ticket_ids),
            ticketlist = ticketlist,
            **self.barcamp)


class TicketPDF(BarcampBaseHandler):
    """render a ticket pdf"""

    @ensure_barcamp()
    @aspdf2()
    def get(self, slug = None, ticket_id = None):
        """print out a ticket as PDF"""

        tmplname = "pdfs/pdfticket.html"
        tickets = self.config.dbs.tickets
        ticket = tickets.find_one({'_id' : ObjectId(ticket_id)})

        if not ticket:
            raise werkzeug.exceptions.NotFound()
        if str(self.user._id) != ticket.user_id:
            self.log.error("trying to obtain ticket for wrong user", logged_in = self.user._id, ticket = ticket)
            raise werkzeug.exceptions.NotFound()

        ticket_class = self.barcamp.get_ticket_class(ticket.ticketclass_id)

        out = self.render(tmplname = tmplname,
            ticket = ticket,
            ticket_class = ticket_class,
            user = self.user,
            view = self.barcamp_view,
            barcamp = self.barcamp,
            **self.barcamp
        )
        return out


class CancelForm(BaseForm):
    """form for adding a new ticket class"""

    reason         = TextAreaField(T(u"Reason"), [validators.Optional(), validators.Length(max=10000)],
                description = T(u'Please give a reason for canceling here (optional).'),
    )
    
class TicketCancel(BarcampBaseHandler):
    """handles canceling a ticket by the user"""

    template = "ticketcancel.html"
    LOGGER = "user_ticketcancel"


    @logged_in()
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
                ticketservice.user_cancel_ticket(ticket.ticketclass_id, ticket_id, reason = form.data['reason'])
                self.flash(self._('Your cancel request has been submitted.'), category="danger")
                return redirect(self.url_for('barcamps.mytickets', slug = slug))

        # get ticket class
        tc_id = ticket.ticketclass_id
        ticket_class = self.barcamp.get_ticket_class(tc_id)
        if ticket_class is None:
            self.log.error("unknown ticket class", tc_id = tc_id)
            raise werkzeug.exceptions.NotFound()

        if ticket['user_id'] != self.user_id:
            self.log.error("user does not match ticket user", tc_id = tc_id)
            raise werkzeug.exceptions.NotFound()

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            ticket = ticket,
            ticket_class = ticket_class,
            form = form,
            user = self.user,
            title = self.barcamp.name,
            **self.barcamp)


    post = get


