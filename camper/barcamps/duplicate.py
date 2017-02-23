#encoding=utf8

from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler, LocationNotFound
import copy
from slugify import UniqueSlugify
from bson import ObjectId
import uuid


class DuplicateForm(BaseForm):
    """legal edit form"""

    copy_events         = BooleanField(T("Copy Events"))
    copy_tickets        = BooleanField(T("Copy Ticket Categories"))
    copy_pages          = BooleanField(T("Copy Custom Pages"))
    

class DuplicateBarcamp(BarcampBaseHandler):
    """duplicate a barcamp
    """

    template = "admin/duplicate.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = DuplicateForm(self.request.form, config = self.config)
        slugify = UniqueSlugify(separator='_', max_length = 50, to_lower = True)

        if self.request.method == 'POST' and form.validate():

            f = form.data

            # as a test just copy everything by just changing the existing camp
            self.barcamp.name = self._("Copy of ") + self.barcamp.name
            new_slug = slugify(self.barcamp.name)
            while self.config.dbs.barcamps.by_slug(new_slug):
                new_slug = new_slug + "_1"

            self.barcamp.slug = new_slug
            self.barcamp.workflow = "created"
            self.barcamp.registration_data = {}

            # either delete all events or just the people
            if "events" not in self.request.form:
                self.barcamp.events = {}
            else:
                for eid, event in self.barcamp.events.items():
                    event['participants'] = []
                    event['maybe'] = []
                    event['waiting_list'] = []
                    event['timetable']['sessions'] = {}
                    self.barcamp.events[eid] = event

            # delete ticket classes if switched off
            if "tickets" not in self.request.form:
                self.barcamp.ticket_classes = []
            else:
                # if events are deleted we need to delete them from the tickets, too
                if "events" not in self.request.form:
                    new_tcs = []
                    for tc in self.barcamp.ticket_classes:
                        tc['events'] = []
                        new_tcs.append(tc)
                    self.barcamp.ticket_classes = new_tcs


            # create new pad uids
            self.barcamp.planning_pad = unicode(uuid.uuid4())
            self.barcamp.documentation_pad = unicode(uuid.uuid4())

            # make it a new one
            self.barcamp['_id'] = ObjectId()

            barcamp = self.config.dbs.barcamps.put(self.barcamp)
            self.flash(self._("The barcamp has been duplicated."), category="info")
            return redirect(self.url_for("barcamps.edit", slug = self.barcamp.slug))

        return self.render(form = form)
    
    post = get
