from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
from cStringIO import StringIO
import datetime

from camper.services import * 



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
            confirmed = confirmed,
            remaining = len(remaining_ticket_ids),
            ticketlist = ticketlist,
            **self.barcamp)

