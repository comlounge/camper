#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from .base import BarcampBaseHandler, LocationNotFound, LocationRetriever
from wtforms import *
from sfext.babel import T
import uuid
import pprint
import datetime
import requests
from form import MyDateField, ATextInput, ACheckboxInput, ATextArea



class EventForm(BaseForm):
    """form for adding an event to a barcamp"""
    name                = TextField(T(u"name of location"), [validators.Length(max=300), validators.Required()],
                widget=ATextInput(),
                description = T(u'Title of this event, e.g. "Day 1" or "Party"'),
    )

    description                 = TextAreaField(T(u"Description"), [],
                description = T(u'This is not the common barcamp description but should be specific about this event.'),
                widget = ATextArea()
    )
    date                        = MyDateField(T(u"date"), [], default=None, format="%d.%m.%Y", description="")
    start_time                  = TextField(T(u"start time"), [validators.Required()], description="")
    end_time                    = TextField(T(u"end time"), [validators.Required()], description="")
    size                        = SelectField(T(u"max. number of participants"), [validators.Required()], 
                                        choices = [(str(n),str(n)) for n in range(1, 1000)])
    
    own_location                = BooleanField(T("use different location"), widget = ACheckboxInput())
    location_name               = TextField(T("name of location"), [], description = T('please enter the name of the venue here'),)
    location_street             = TextField(T("street and number "), [], description = T('street and number of the venue'),)
    location_city               = TextField(T("city"), [])
    location_zip                = TextField(T("zip"), [])
    location_url                = TextField(T("homepage"), [], description=T('web site of the venue (optional)'))
    location_phone              = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email              = TextField(T("email"), [], description=T('email address of the venue (optional)'))
    location_description        = TextAreaField(T("description"), [], description=T('an optional description of the venue'))
    location_lat                = HiddenField()
    location_lng               = HiddenField()


class EventsView(BarcampBaseHandler):
    """shows the event page where you can add, edit and delete events"""

    template = "events.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """show the list of events and an add form for adding more"""

        # prefill some values if there's already a previous event
        obj = {}
        el = self.barcamp.eventlist
        if len(el):
            e = el[-1]
            obj['date'] = e['date'] + datetime.timedelta(days=1)
            obj['start_time'] = e['start_time']
            obj['end_time'] = e['end_time']
            obj['size'] = e['size']

        form = EventForm(self.request.form, config = self.config, **obj)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
                'country'   : 'de',
            }

            # retrieve geo location (but only when not in test mode as we might be offline)
            if f['location_street'] and not self.config.testing and f['own_location']:
                f = retrieve_location(f)


            # create and save the event object inside the barcamp
            eid = f['_id'] = unicode(uuid.uuid4())
            event = db.Event(f)
            self.barcamp.events[eid] = event
            self.barcamp.save()

            self.flash(self._("The event has been created"), category="info")
            return redirect(self.url_for(".events", slug=slug))
        return self.render(form = form, slug = slug, events = self.barcamp.eventlist)
    post = get

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    @asjson()
    def delete(self, slug):
        """delete an event"""
        eid = self.request.form['event']
        idx = 0
        for e in self.barcamp.events:
            if str(e['_id']) == str(eid):
                self.barcamp.events.remove(e)
                break
            idx = idx + 1 
        self.barcamp.save()
        return {'status' : 'ok'}


class EventView(BarcampBaseHandler):
    """shows one event which you can then edit"""

    template = "event.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None, eid = None):
        """show the event details"""
        event = self.barcamp.get_event(eid)
        print event.location['lat']

        # copy event location over to form

        event['location_name'] = event.location['name']
        event['location_street'] = event.location['street']
        event['location_city'] = event.location['city']
        event['location_zip'] = event.location['zip']
        event['location_country'] = event.location['country']
        event['location_email'] = event.location['email']
        event['location_phone'] = event.location['phone']
        event['location_url'] = event.location['url']
        event['location_description'] = event.location['description']
        event['location_lat'] = event.location['lat']
        event['location_lng'] = event.location['lng']

        form = EventForm(self.request.form, obj = event, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
                'lat'       : f['location_lat'],
                'lng'       : f['location_lng'],
                'country'   : 'de',
            }


            # check location only if it actually has changed
            # only check if we are not in unit test and if own location is selected
            # also don't retrieve it if user has set own coordinates
            if self.request.form.get('own_coords', "no") != "yes":
                print "computing coords"
                changed = (f['location_city'] != event.location['city'] or
                    f['location_street'] != event.location['street'] or
                    f['location_zip'] != event.location['zip'])

                print changed

                if ( changed and not self.config.testing and f['own_location']):
                    print "updating"
                    # own_coords means that the user already provided geo coords
                    event.update(f) # so that the retriever knows the new data
                    retriever = LocationRetriever(event)
                    try:
                        retriever()
                    except LocationNotFound:
                        self.flash(self._("the city was not found in the geo database"), category="danger")
            else:
                    print "taking user coords"
                    event.update(f)

            # create and save the event object inside the barcamp
            pprint.pprint(event.location)
            self.barcamp.events[eid] = event
            self.barcamp.save()
            self.flash(self._("The event has been successfully updated"), category="info")

            return redirect(self.url_for(".event", slug=slug, eid = event._id))
        return self.render(form = form, slug = slug, events = self.barcamp.events, event=event, eid = event._id)
    post = get


class GetLocation(BarcampBaseHandler):
    """retrieve a location by address and return json"""

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    @asjson()
    def get(self, slug = None, eid = None):
        """take the location data and return geo coords or an error"""
        event = self.barcamp.get_event(eid)
        print self.request.args.to_dict(True)
        event.location.update(self.request.args.to_dict(True))
        retriever = LocationRetriever(event)
        try:
            retriever()
        except LocationNotFound:
            return {'success': False, 
                    'msg': self._("the city was not found in the geo database")
            }

        return {
            'success' : True,
            'lat' : event.location['lat'],
            'lng' : event.location['lng']
        }


