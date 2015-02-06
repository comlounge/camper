#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from camper.handlers.forms import *
from sfext.babel import T
from wtforms import *
import werkzeug.exceptions
import babel
import json
from .base import BarcampBaseHandler, SponsorForm

class RoomForm(BaseForm):
    """form for adding a new room"""
    name                = TextField(T(u"Name"), [validators.Length(max=300), validators.Required()])
    capacity            = IntegerField(T(u"Capacity"), [validators.NumberRange(min=1), validators.Required()])
    description         = TextAreaField(T(u"Description"), [validators.Length(max=200)])


class SessionBoard(BarcampBaseHandler):
    """shows editable sessionboard"""

    template = "sessionboard.html"

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

    @asjson()
    def get(self, slug = None, eid = None):
        """return rooms and timeslots"""

        ub = self.app.module_map.userbase

        event = self.barcamp.get_event(eid)
        rooms = event.timetable.get('rooms', [])
        timeslots = event.timetable.get('timeslots', []) 
        participants = list(ub.get_users_by_ids(event.participants))
        participants = [{'name' : p.fullname, '_id' : str(p._id)} for p in participants]

        return {
            'rooms' : rooms,
            'timeslots': timeslots,
            'event' : event,
            'eid' : event._id,
            'participants': participants
        }

    @asjson()
    def post(self, slug = None, eid = None):
        """store room and timetable data"""
        event = self.barcamp.get_event(eid)
        data = json.loads(self.request.data)
        event.timetable = data
        self.barcamp.events[eid] = event
        self.barcamp.save()
        return {'status' : 'ok'}