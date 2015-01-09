#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from camper.handlers.forms import *
from sfext.babel import T
from wtforms import *
import werkzeug.exceptions
import babel
from .base import BarcampBaseHandler, SponsorForm

class RoomForm(BaseForm):
    """form for adding a new room"""
    name                = TextField(T(u"Name"), [validators.Length(max=300), validators.Required()])
    capacity            = IntegerField(T(u"Capacity"), [validators.NumberRange(min=1), validators.Required()])
    description         = TextAreaField(T(u"Description"), [validators.Length(max=200)])


class SessionBoard(BarcampBaseHandler):
    """shows editable sessionboard"""

    template = "sessionboard.html"

    def get(self, slug = None):
        """render the view"""
        room_form= RoomForm(self.request.form, config = self.config)

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            room_form = room_form,
            **self.barcamp)

class SessionBoardData(BarcampBaseHandler):
    """handles all AJAX related session board data"""

    @asjson()
    def get(self, slug=None):
        """return rooms and timeslots"""

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
            {
                'name' : '10:00',
                'blocked' : False,
            },
            {
                'name' : '11:00',
                'blocked' : False,
            },
            {
                'name' : '12:00',
                'blocked' : False,
            },
            {
                'name' : '13:00',
                'blocked' : True,
                'reason' : "Mittagspause"
            }
        ]

        return {
            'rooms' : rooms,
            'timeslots': timeslots
        }