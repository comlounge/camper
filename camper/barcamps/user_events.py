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
from camper.services import TicketService


class Events(BarcampBaseHandler):
    """show the list of events"""

    template = 'user_events.html'

    @ensure_barcamp()
    def get(self, slug = None):
        """show the event list"""
        uid = unicode(self.user._id) if self.logged_in else None
        
        form_data = self.barcamp.registration_data.get(uid,{})
        has_form_data = len(form_data) # we need to at least have one key

        # get registration form
        data_names = {}
        for e in self.barcamp.registration_form:
            data_names[e['name']] = e['title']

        # get participants for tickets
        participants = []
        if self.barcamp.ticketmode_enabled:
            ticketservice = TicketService(self, None, self.barcamp)
            tickets = ticketservice.get_tickets()

            # filter those with optin
            regdata = self.barcamp.registration_data
            optin_users = [uid for uid in regdata if regdata[uid].get('optin_participant', False)]

            user_ids = set([t['user_id'] for t in tickets])
            ub = self.app.module_map.userbase
            participants = [ub.get_user_by_id(uid) for uid in user_ids if uid in optin_users]

        
        out = self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            has_form = len(self.barcamp.registration_form) != 0,
            has_form_data = has_form_data,
            form_data = form_data,
            data_names = data_names,
            participants = participants,
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

        # filter participants by list optin
        regdata = self.barcamp.registration_data

        # map to optin
        optin_users = [uid for uid in regdata if regdata[uid].get('optin_participant', False)]
        
        maybe = [ub.get_user_by_id(uid) for uid in e.maybe if uid in optin_users]
        waiting_list = [ub.get_user_by_id(uid) for uid in e.waiting_list if uid in optin_users]
        participants = [ub.get_user_by_id(uid) for uid in e.participants if uid in optin_users]
        
        if self.logged_in:
            uid = unicode(self.user._id)
        else:
            uid = None
        active_tab = self.request.args.get("at", "participants")

        if self.logged_in:
            fav_sessions = self.app.config.dbs.userfavs.get_favs_for_bc(str(self.barcamp._id), self.user_id, eid)
        else:
            fav_sessions = []

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            participants = participants,
            active_event = e,
            maybe = maybe,
            waitinglist = waiting_list,
            title = self.barcamp.name,
            active_tab = active_tab,
            is_registered = self.barcamp.is_registered(self.user),
            sessionplan = e.timetable.get('sessions', {}),
            rooms = e.rooms,
            timeslots = e.timeslots,
            fav_sessions = fav_sessions,
            has_form = len(self.barcamp.registration_form) != 0,
            has_form_data = self.barcamp.registration_data.has_key(uid),
            form_data = self.barcamp.registration_data.get(uid,{}),
            **self.barcamp)

class ToggleFavSession(BarcampBaseHandler):
    """ajax handler for toggling fav sessions"""

    @logged_in()
    @asjson()
    @ensure_barcamp()
    def post(self, slug = None, eid = None, sid = None):
        """toggle the fav status of a session

        :param slug: slug of barcamp
        :param eid: event id
        :param sid: session to toggle
        :returns: True or False depending on fav status
        """
        if not slug or not eid or not sid:
            raise NotFound()

        return {
            'fav' : self.app.config.dbs.userfavs.toggle_fav(
                str(self.barcamp._id),
                user_id = self.user_id,
                event_id = eid,
                session_id = sid)
        }
