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
    def get(self, slug = None, eid = None):
        """show an individual event"""

        if eid is None:
            e = self.barcamp.eventlist[0]
        else:
            e = self.barcamp.get_event(eid)
        ub = self.app.module_map.userbase
        participants = list(ub.get_users_by_ids(e.participants))
        maybe = list(ub.get_users_by_ids(e.maybe))
        waitinglist = list(ub.get_users_by_ids(e.waiting_list))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            participants = participants,
            active_event = e,
            maybe = maybe,
            waitinglist = waitinglist,
            title = self.barcamp.name,
            is_registered = self.barcamp.is_registered(self.user),
            sessionplan = e.timetable.get('sessions', {}),
            rooms = e.rooms,
            timeslots = e.timeslots,
            **self.barcamp)
