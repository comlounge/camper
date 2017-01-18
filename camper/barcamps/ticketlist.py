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
    

class TicketList(BarcampBaseHandler):
    """handles confirming and canceling tickets"""

    template = "admin/ticketlist.html"

    LOGGER = "ticketlist"

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""

        # make sure we are supposed to be shown
        if not self.barcamp.ticketmode_enabled:
            self.flash(self._('Ticketing Mode not enabled.'), category="danger")
            return redirect(self.url_for("barcamps.admin_ticketeditor", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            ticketlist = self.barcamp.ticketlist,
            title = self.barcamp.name,
            **self.barcamp)


    @ensure_barcamp()
    @asjson()
    @is_admin()
    def post(self, slug = None, eid = None):
        """handle ticket cancels and confirmations

    
        """
        uid = self.request.form.get("uid")
        status = self.request.form.get("status") # can be join, maybe, notgoubg
        tc_id = self.request.form.get("tc_id") # ticket class

        if tc_id not in self.barcamp.tickets:
            self.log.error("ticket class not found", tc_id = tc_id, status = status, uid = uid)
            return {'status': 'error', 'msg': 'ticket class not known'}

        if uid not in self.barcamp.tickets[tc_id]:
            self.log.error("uid not found in ticket class", tc_id = tc_id, status = status, uid = uid)
            return {'status': 'error', 'msg': 'uid not known for ticket class'}

        # TODO move to ticket service and send email in both cases. 
        if status == "approve":
            self.barcamp.tickets[tc_id][uid]['status'] = "confirmed"
        elif status == "cancel":
            del self.barcamp.tickets[tc_id][uid]

        self.barcamp.save()

        return {'status' : 'success', 'reload' : True}

