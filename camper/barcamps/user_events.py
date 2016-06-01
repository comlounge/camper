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
        """show the event list"""
        uid = unicode(self.user._id) if self.logged_in else None
        out = self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            has_form = len(self.barcamp.registration_form) != 0,
            has_form_data = self.barcamp.registration_data.has_key(uid),
            form_data = self.barcamp.registration_data.get(uid,{}),
            **self.barcamp)
        return out


class Event(BarcampBaseHandler):
    """show the list of events"""

    template = 'user_event.html'

    @ensure_barcamp()
    def get(self, slug = None, eid = None):
        """show an individual event"""

        if eid is None:
            e = self.barcamp.eventlist[0]
        else:
            e = self.barcamp.get_event(eid)
        ub = self.app.module_map.userbase
        maybe = list(ub.get_users_by_ids(e.maybe))
        waitinglist = [ub.get_user_by_id(uid) for uid in e.waiting_list]
        participants = [ub.get_user_by_id(uid) for uid in e.participants]
        
        if self.logged_in:
            uid = unicode(self.user._id)
        else:
            uid = None
        active_tab = self.request.args.get("at", "participants")

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            participants = participants,
            active_event = e,
            maybe = maybe,
            waitinglist = waitinglist,
            title = self.barcamp.name,
            active_tab = active_tab,
            is_registered = self.barcamp.is_registered(self.user),
            sessionplan = e.timetable.get('sessions', {}),
            rooms = e.rooms,
            timeslots = e.timeslots,
            has_form = len(self.barcamp.registration_form) != 0,
            has_form_data = self.barcamp.registration_data.has_key(uid),
            form_data = self.barcamp.registration_data.get(uid,{}),
            **self.barcamp)
