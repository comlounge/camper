#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from camper.base import aspdf
from camper.handlers.forms import *
from sfext.babel import T
from wtforms import *
import werkzeug.exceptions
import babel
import json
from .base import BarcampBaseHandler

class RoomForm(BaseForm):
    """form for adding a new room"""
    name                = TextField(T(u"Name"), [validators.Length(max=300), validators.Required()])
    capacity            = IntegerField(T(u"Capacity"), [validators.NumberRange(min=1), validators.Required()])
    description         = TextAreaField(T(u"Description"), [validators.Length(max=200)])


class SessionBoard(BarcampBaseHandler):
    """shows editable sessionboard"""

    template = "admin/sessionboard.html"

    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None, eid = None):
        """render the view"""
        event = self.barcamp.get_event(eid)
        room_form= RoomForm(self.request.form, config = self.config)

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            room_form = room_form,
            event = event,
            eid = event._id,
            **self.barcamp)

class SessionBoardData(BarcampBaseHandler):
    """handles all AJAX related session board data"""

    @ensure_barcamp()
    @is_admin()
    @asjson()
    def get(self, slug = None, eid = None):
        """return rooms and timeslots"""

        ub = self.app.module_map.userbase

        event = self.barcamp.get_event(eid)
        rooms = event.timetable.get('rooms', [])
        timeslots = event.timetable.get('timeslots', [])
        sessions = event.timetable.get('sessions', {})
        participants = list(ub.get_users_by_ids(event.participants))
        participants = [{'name' : p.fullname, '_id' : str(p._id)} for p in participants]
        proposals = []
        for p in self.config.dbs.sessions.find({'barcamp_id' : str(self.barcamp_id)}):
            proposals.append({
                'value' : p.title,
                'label' : "%s (%s)" %(p.title, p.user.fullname),
                'description' : p.description,
                'user_id' : p.user_id,
                'vote_count' : p.vote_count,
            })
                    
        return {
            'rooms' : rooms,
            'timeslots': timeslots,
            'event' : event,
            'eid' : event._id,
            'participants': participants,
            'proposals' : proposals,
            'sessions' : sessions,
        }

    @ensure_barcamp()
    @is_admin()
    @asjson()
    def post(self, slug = None, eid = None):
        """store room and timetable data"""
        event = self.barcamp.get_event(eid)
        data = json.loads(self.request.data)
        event.timetable = {
            'rooms' : data.get("rooms", []),
            'timeslots' : data.get("timeslots", []),
            'sessions' : data.get("sessions", {}),
        }
        self.barcamp.events[eid] = event
        self.barcamp.save()
        return {'status' : 'ok'}


class SessionBoardPrint(BarcampBaseHandler):
    """return a PDF of the session board data"""

    @is_admin()
    @ensure_barcamp()
    @aspdf()
    def get(self, slug = None, eid = None):
        """return times, rooms or both as PDF"""

        fmt = self.request.args.get("fmt", "times") # can be "times", "rooms", "both"

        event = self.barcamp.get_event(eid)
        rooms = event.rooms
        timeslots = event.timeslots
        sessions = event.timetable.get('sessions', {})

        tmplname = "pdfs/sessionboard_%s.html" %fmt
        out = self.render(tmplname = tmplname,
                event = event,
                rooms = rooms,
                timeslots = timeslots,
                sessions = sessions,
                barcamp = self.barcamp
            )
        return out


