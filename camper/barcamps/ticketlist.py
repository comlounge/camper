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
            for status in ['pending', 'confirmed', 'canceled']:
                tc[status] = tickets.get_tickets(
                    barcamp_id = self.barcamp._id,
                    user_id = self.user_id, 
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

        if tc_id not in self.barcamp.tickets:
            self.log.error("ticket class not found", tc_id = tc_id, status = status, uid = uid)
            return {'status': 'error', 'msg': 'ticket class not known'}

        if uid not in self.barcamp.tickets[tc_id]:
            self.log.error("uid not found in ticket class", tc_id = tc_id, status = status, uid = uid)
            return {'status': 'error', 'msg': 'uid not known for ticket class'}

        
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

