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


class Events(BarcampBaseHandler):
    """show the list of events"""

    template = 'user_events.html'

    @ensure_barcamp()
    def get(self, slug = None):
        """show an individual event"""

        e = self.barcamp.eventlist[0]
        ub = self.app.module_map.userbase
        participants = list(ub.get_users_by_ids(e.participants))
        maybe = list(ub.get_users_by_ids(e.maybe))
        waitinglist = list(ub.get_users_by_ids(e.waiting_list))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            participants = waitinglist*17,
            maybe = maybe*13,
            waitinglist = waitinglist*12,
            title = self.barcamp.name,
            is_registered = self.barcamp.is_registered(self.user),
            **self.barcamp)
