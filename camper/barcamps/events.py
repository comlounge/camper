#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from .base import BarcampBaseHandler, LocationNotFound
from wtforms import *
from sfext.babel import T
import uuid
import pprint
import datetime
import requests
import gettext
import pycountry
from camper.form import MyDateField

from camper.services import RegistrationService, RegistrationError


class EventForm(BaseForm):
    """form for adding an event to a barcamp"""
    name                = TextField(T(u"name of location"), [validators.Length(max=300), validators.Required()],
                description = T(u'Title of this event, e.g. "Day 1" or "Party"'),
    )

    description                 = TextAreaField(T(u"Description"), [],
                description = T(u'This is not the common barcamp description but should be specific about this event.'),
    )
    date                        = MyDateField(T(u"date"), [validators.Required()], default=None, format="%d.%m.%Y", description="")
    start_time                  = TextField(T(u"start time"), [validators.Required()], description="")
    end_time                    = TextField(T(u"end time"), [validators.Required()], description="")
    size                        = SelectField(T(u"max. number of participants"), [validators.Required()], 
                                        choices = [(str(n),str(n)) for n in range(1, 500)])
    
    own_location                = BooleanField(T("use different location"))
    location_name               = TextField(T("name of location"), [], description = T('please enter the name of the venue here'),)
    location_street             = TextField(T("street and number "), [], description = T('street and number of the venue'),)
    location_city               = TextField(T("city"), [])
    location_zip                = TextField(T("zip"), [])
    location_country            = SelectField(T("Country"), default="DE")
    location_url                = TextField(T("homepage"), [], description=T('web site of the venue (optional)'))
    location_phone              = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email              = TextField(T("email"), [], description=T('email address of the venue (optional)'))
    location_description        = TextAreaField(T("description"), [], description=T('an optional description of the venue'))
    location_lat                = HiddenField()
    location_lng                = HiddenField()


class EventsView(BarcampBaseHandler):
    """shows the event page where you can add, edit and delete events"""

    template = "admin/events.html"

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
            #obj['date'] = e['date'] + datetime.timedelta(days=1)
            obj['start_time'] = e['start_time']
            obj['end_time'] = e['end_time']
            obj['size'] = e['size']
        else:
            obj['date'] = self.barcamp.start_date
            obj['start_time'] = "12:00"
            obj['end_time'] = "23:00"

        form = EventForm(self.request.form, config = self.config, **obj)

        # get countries and translate them
        try:
            trans = gettext.translation('iso3166', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        except IOError:
            # en only has iso3166_2
            trans = gettext.translation('iso3166_2', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        
        countries = [(c.alpha2, trans.ugettext(c.name)) for c in pycountry.countries]
        form.location_country.choices = countries


        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'country'   : f['location_country'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
            }

            # retrieve geo location (but only when not in test mode as we might be offline)
            # and if user hasn't provided own coors
            if self.request.form.get('own_coords', "no") != "yes" and f['location_street'] and not self.config.testing and f['own_location']:
                street = f['location']['street']
                city = f['location']['city']
                zip = f['location']['zip']
                country = f['location']['country']        
                try:
                    lat, lng = self.retrieve_location(street, zip, city, country)
                    f['location']['lat'] = lat
                    f['location']['lng'] = lng
                except LocationNotFound:
                    self.flash(self._("the city was not found in the geo database"), category="danger")

            if self.request.form.get('own_coords', 'no') == "yes":
                f['location']['lat'] = f['location_lat']
                f['location']['lng'] = f['location_lng']

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
        for e in self.barcamp.events:
            if str(e) == str(eid):
                del self.barcamp.events[e]
                break
        self.barcamp.save()
        return {'status' : 'ok'}


class EventView(BarcampBaseHandler):
    """shows one event which you can then edit"""

    template = "admin/event.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None, eid = None):
        """show the event details"""
        event = self.barcamp.get_event(eid)

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

        # get countries and translate them
        try:
            trans = gettext.translation('iso3166', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        except IOError:
            # en only has iso3166_2
            trans = gettext.translation('iso3166_2', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        
        countries = [(c.alpha2, trans.ugettext(c.name)) for c in pycountry.countries]
        form.location_country.choices = countries

        if self.barcamp.public:
            # the minimum size should be the old event size
            min_count = event.size
            choices = [(str(n),str(n)) for n in range(event.size, 500)]
            form['size'].validators = [validators.Required(), 
                validators.NumberRange(min=min_count, message=self._("you cannot reduce the participant number, the minimum amount is %s") %min_count)]
            form['size'].choices = choices

        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'country'   : f['location_country'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
                'lat'       : f['location_lat'] or None,
                'lng'       : f['location_lng'] or None,
            }



            # remember old values
            old_street = event.location['street']
            old_zip = event.location['zip']
            old_city = event.location['city']
            old_country = event.location['country']

            # now update event
            event.update(f)

            # check location only if it actually has changed
            # only check if we are not in unit test and if own location is selected
            # also don't retrieve it if user has set own coordinates
            if self.request.form.get('own_coords', "no") != "yes":
                # computing coords from address
                changed = (f['location_city'] != old_city or
                    f['location_street'] != old_street or
                    f['location_zip'] != old_zip or
                    f['location_country'] != old_country)

                if ( changed and not self.config.testing and f['own_location']):
                    street = event.location['street']
                    city = event.location['city']
                    zip = event.location['zip']
                    country = event.location['country']
                    try:
                        lat, lng = self.retrieve_location(street, zip, city, country)
                        event.location['lat'] = lat
                        event.location['lng'] = lng
                    except LocationNotFound:
                        self.flash(self._("the city was not found in the geo database"), category="danger")
            else:
                    # using user provided coordinates
                    event.update(f)

            # check if we can fill up the participants from the waiting list
            uids = event.fill_participants()
            users = self.app.module_map.userbase.get_users_by_ids(uids)
            for user in users:
                # send out a welcome email
                self.mail_template("welcome",
                    view = self.barcamp_view,
                    user = user,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    **self.barcamp)
            
            # create and save the event object inside the barcamp
            self.barcamp.events[eid] = event
            self.barcamp.save()
            self.flash(self._("The event has been successfully updated"), category="info")

            return redirect(self.url_for(".event", slug=slug, eid = event._id))
        return self.render(form = form, slug = slug, events = self.barcamp.events, event=event, eid = event._id)
    post = get


class EventParticipants(BarcampBaseHandler):
    """view for handling the participnats list for an event"""

    template = 'admin/event_participants.html'

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None, eid = None):
        """show the event participants screen"""
        event = self.barcamp.get_event(eid)

        # get all the lists
        ub = self.app.module_map.userbase
        maybe = list(ub.get_users_by_ids(event.maybe))
        waitinglist = [ub.get_user_by_id(uid) for uid in event.waiting_list]
        participants = [ub.get_user_by_id(uid) for uid in event.participants]


        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            participants = participants,
            maybe = maybe,
            waitinglist = waitinglist,
            event = event,
            eid = event._id,
            title = self.barcamp.name,
            **self.barcamp)

    @ensure_barcamp()
    @asjson()
    @is_admin()
    def post(self, slug = None, eid = None):
        """handle users and lists

        you have to provide a userid as uid and a status in the form data
        status can be ``going``, ``maybe``, ``notgoing`` and ``waitinglist``

        """
        uid = self.request.form.get("uid")
        status = self.request.form.get("status") # can be join, maybe, notgoubg
        event = self.barcamp.get_event(eid)
        
        user = self.app.module_map.userbase.get_user_by_id(uid)

        reg = RegistrationService(self, user)
        try:
            status = reg.set_status(eid, status, force=True)
        except RegistrationError, e:
            print "a registration error occurred", e
            raise ProcessingError(str(e))
            return 

        return {'status' : 'success', 'reload' : True}



class GetLocation(BaseHandler):
    """retrieve a location by address and return json"""

    @logged_in()
    @is_admin()
    @asjson()
    def get(self):
        """take the location data and return geo coords or an error"""
        street = self.request.args.get("street", "")
        zip = self.request.args.get("zip","")
        city = self.request.args.get("city","")
        country = self.request.args.get("country","Germany")

        if street=="" or city=="" or country=="":
            return {'success': False, 
                    'msg': self._("no full address was given")
            }
        try:
            lat, lng = self.retrieve_location(street, zip, city, country)
        except LocationNotFound:
            return {'success': False, 
                    'msg': self._("we couldn't lookup a geo coordinates for this address")
            }
        return {
            'success' : True,
            'lat' : lat,
            'lng' : lng
        }


