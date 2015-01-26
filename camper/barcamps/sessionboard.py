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

        event = self.barcamp.get_event(eid)

        rooms = [
            {
                'id' : 1,
                'name' : 'Eurogress',
                'capacity' : 430,
                'description' : 'hat Beamer'
            },
            {
                'id' : 2,
                'name' : 'Rathaus',
                'capacity' : 120,
                'description' : 'hat Politik'
            },
            {
                'id' : 3,
                'name' : 'COM.lounge',
                'capacity' : 50,
                'description' : 'hat Code'
            },
            {
                'id' : 4,
                'name' : 'Kaiserplatz',
                'capacity' : 30,
                'description' : 'hat Galerie'
            },
        ]

        timeslots = [
            # {
            #     'time' : '10:00',
            #     'blocked' : False,
            # },
            # {
            #     'time' : '11:00',
            #     'blocked' : False,
            # },
            # {
            #     'time' : '12:00',
            #     'blocked' : False,
            # },
            # {
            #     'time' : '13:00',
            #     'blocked' : True,
            #     'reason' : "Mittagspause"
            # }

        ]

        return {
            'rooms' : rooms,
            'timeslots': timeslots,
            'event' : event,
            'eid' : event._id
        }

    @asjson()
    def post(self, slug = None, eid = None):
        """store room and timetable data"""
        event = self.barcamp.get_event(eid)
        data = json.loads(self.request.data)
        print data
        return {'status' : 'ok'}