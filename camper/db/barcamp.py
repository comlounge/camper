from mongogogo import *
import datetime
from camper.exceptions import *
import isodate
import pycountry
from slugify import UniqueSlugify

__all__=["Barcamp", "BarcampSchema", "Barcamps", "Event"]

class BaseError(Exception):
    """base class for exceptions"""

    def __init__(self, msg):
        """initialize the error with a message"""
        self.msg = msg

class WorkflowError(BaseError):
    """error in workflow e.g. transition not allowed"""

    def __init__(self, msg = u"Transition nicht erlaubt" , old_state = None, new_state = None):
        """initialize the error with a message"""
        self.msg = msg
        self.old_state = old_state
        self.new_state = new_state

    def __str__(self):
        """return a printable representation"""
        return """<WorkflowError: %s (old=%s, new=%s)>""" %(self.msg, self.old_state, self.new_state)



class LocationSchema(Schema):
    """a location described by name, lat and long"""
    name            = String()
    street          = String()
    city            = String()
    zip             = String()
    country         = String()
    url             = String()
    phone           = String()
    email           = String()
    description     = String()

    lat = Float()
    lng = Float()



class Sponsor(Schema):
    """a location described by name, lat and long"""
    logo = String(required=True) # asset id
    name = String(required=True)
    url = String(required=True)

class BlogLinkSchema(Schema):
    """a link to a blog for documentation"""
    title = String(required = True)
    url = String(required = True)
    user_id = String(required = True)


class RegistrationFieldSchema(Schema):
    """a sub schema describing a field for the registration form"""
    name                = String(required=True)
    title               = String(required=True)
    description         = String()
    fieldtype           = String(required=True)
    required            = Boolean()


class MailsSchema(Schema):
    """a sub schema describing email templates"""
    welcome_subject         = String()
    welcome_text            = String()
    onwaitinglist_subject   = String()
    onwaitinglist_text      = String()
    fromwaitinglist_subject = String()
    fromwaitinglist_text    = String()


class Location(Record):
    """a location"""

    schema = LocationSchema()

    @property
    def country_name(self):
        """retrieve the country name from the country db. It's not i18n"""
        return pycountry.countries.get(alpha2 = self.country).name

class SessionSchema(Schema):
    """a session in a timetable"""
    _id                 = String(required = True)   # the session index made out of timeslot and room
    title               = String(required = True, max_length = 255)
    description         = String(max_length = 5000)
    moderator           = String(default = "") # actually list of names separated by comma

    # sid and slug for url referencing, will be computed in before_serialze below in Barcamps
    sid                 = String(required = True)   # the actual unique id   
    slug                = String(required = True, max_length = 100)
    pad                 = String() # the pad id for the documentation

class RoomSchema(Schema):
    """a room"""
    id                  = String(required = True)   # uuid
    name                = String(required = True, max_length = 100)
    capacity            = Integer(required = True, default = 20)
    description         = String(max_length = 1000)

class TimeSlotSchema(Schema):
    """a timeslot"""
    time                = Regexp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", required = True)    # only HH:MM here
    #time                = String()
    reason              = String(default = "", max_length = 200)      # optional reason for blocking it
    blocked             = Boolean(default = False)     # is it blocked?

class TimeTableSchema(Schema):
    """a timetable of an event"""
    timeslots           = List(TimeSlotSchema())
    rooms               = List(RoomSchema())
    sessions            = Dict(SessionSchema(), default = {})


class EventSchema(Schema):
    """a sub schema describing one event"""
    _id                 = String(required=True)
    name                = String(required=True, max_length = 255)
    description         = String(required=True, max_length = 5000)
    date                = DateTime()
    start_time          = String(max_length = 5)
    end_time            = String(max_length = 5)
    location            = LocationSchema(kls = Location, default = {})
    participants        = List(String()) # TODO: ref
    size                = Integer()
    maybe               = List(String()) # we maybe will implement this
    waiting_list        = List(String()) # TODO: ref
    own_location        = Boolean() # flag if the barcamp address is used or not 
    timetable           = TimeTableSchema(default = {
                            'rooms' : [],
                            'timeslots': [],
                            'sessions' : {},
                        })

class Event(Record):
    """wraps event data with a class to provider more properties etc."""

    schema = EventSchema()
    _protected = ['_barcamp']

    def __init__(self, *args, **kwargs):
        """initialize the event"""
        super(Event, self).__init__(*args, **kwargs)
        self._barcamp = kwargs.get('_barcamp', None)

    @property
    def state(self):
        """returns the state of the event which can be one of

        planning -- the event has not started
        active -- the event is active
        finished -- the event has finished

        All of those depend on the date which will be checked in here.

        We only check for days, not timestamps, so if an event starts at 10am it still
        is supposed to be active for the whole day.
        """

        # convert everthing to dates without time
        today = datetime.date.today()
        start = self.start_date.date()
        end = self.end_date.date()

        if today < start:
            return "planning"
        if today > end:
            return "finished"
        return "active"

    def add_participant(self, user):
        """register a new user via the user object

        :param user: user object
        :raises ParticipantListFull: in case the participant list was full. The uses
            is moved to the waiting list then instead
        :returns: nothing which means everthing went ok. Don't forget to save the barcamp
            afterwards
        """
        uid = unicode(user._id)
        if uid in self.participants:
            return

        if len(self.participants) >= self.size:
            if uid not in self.waiting_list:
                self.waiting_list.append(uid)
            raise ParticipantListFull()

        # all checks ok, add it to the list of participants
        self.participants.append(uid)

        # any mail will be sent by the application logic

    @property
    def full(self):
        """return whether event is full or not"""
        return len(self.participants) >= self.size

    def set_status(self, uid, status="going", force=False):
        """set the status of the user for this event, read: register the user

        :param uid: the user id of the user (unicode)
        :param status: can be "going", "maybe", "notgoing" 
        :param force: if ``True`` then a user can be added to the participants regardless if barcamp is full
        :returns: the final status (going, waitinglist, maybe, notgoing)
        """

        if status=="going":
            if not force and (len(self.participants) >= self.size or self._barcamp.preregistration):
                # user induced action
                if uid not in self.waiting_list:
                    self.waiting_list.append(uid)
                    if uid in self.maybe:
                        self.maybe.remove(uid)
                    status = 'waitinglist'
            else:
                # force is only done by admins and can overpop an event. 
                if uid not in self.participants:
                    self.participants.append(uid)
                    if uid in self.maybe:
                        self.maybe.remove(uid)
                    if uid in self.waiting_list:
                        self.waiting_list.remove(uid)
                    status = 'going'
            return status

        elif status=="maybe" or status=="notgoing":
            if uid in self.participants:
                self.participants.remove(uid)
            if uid in self.waiting_list:
                self.waiting_list.remove(uid)
            if status=="maybe" and uid not in self.maybe:
                self.maybe.append(uid)
            if status=="notgoing" and uid in self.maybe:
                self.maybe.remove(uid)
            return status

        elif status=="waiting":
            # this is something only the admin can do
            if uid in self.participants:
                self.participants.remove(uid)
            if uid in self.maybe:
                self.maybe.remove(uid)
            if uid not in self.waiting_list:
                self.waiting_list.append(uid)
            return status

        elif status=="deleted":
            # remove a user from the barcamp            
            if uid in self.participants:
                self.participants.remove(uid)
            if uid in self.maybe:
                self.maybe.remove(uid)
            if uid in self.waiting_list:
                self.waiting_list.remove(uid)
            return status

    
    def fill_participants(self):
        """try to fill up the participant list from the waiting list in case
        there is space. This should be called after somebody was removed from the
        participants list or the size was increased.
        It returns a list of user ids so you can send out mails.

        """
        # only fill participation list if we are in preregistration mode
        if self._barcamp.preregistration:
            return []
        uids = []
        while len(self.participants) < self.size and len(self.waiting_list)>0:
            nuid = self.waiting_list.pop(0)
            self.participants.append(nuid)
            uids.append(nuid)
        return uids


    @property
    def rooms(self):
        """return the rooms"""
        return self.timetable.get('rooms', [])

    @property
    def timeslots(self):
        """return the timeslots"""
        return self.timetable.get('timeslots', [])



class BarcampSchema(Schema):
    """main schema for a barcamp holding all information about core data, events etc."""

    created             = DateTime()
    updated             = DateTime()
    created_by          = String() # TODO: should be ref to user
    workflow            = String(required = True, default = "created")

    # location
    location            = LocationSchema(kls = Location)

    # base data
    name                = String(required = True)
    description         = String(required = True)
    slug                = String(required = True)
    registration_date   = Date() # date when the registration starts
    start_date          = Date()
    end_date            = Date()

    seo_description     = String() # description for meta tags
    seo_keywords        = String() # keywords for meta tags
    
    twitter             = String() # only the username
    hashtag             = String()
    gplus               = String()
    facebook            = String() # facebook page
    homepage            = String() # URL
    twitterwall         = String() # URL

    
    hide_barcamp        = Boolean(default=False) # whether the whole barcamp should be visible or not
    preregistration     = Boolean(default=False) # if ppl need to be put manually on the participation list


    # documentation
    planning_pad        = String() # ID of the planning etherpad
    documentation_pad   = String() # ID of the pad for documentation
    planning_pad_public = Boolean(default = False)
    blogposts           = List(BlogLinkSchema())

    # design
    logo                = String() # asset id
    link_color          = String()
    text_color          = String()
    background_image    = String()
    background_color    = String()
    font                = String()
    fb_image            = String()
    header_color        = String()
    text_color          = String()

    navbar_link_color   = String() # text color of all navbar links
    navbar_active_color = String() # text color of active navbar item 
    navbar_border_color = String() # border color of all navbar items
    navbar_active_bg    = String() # bg color of active item
    navbar_hover_bg     = String() # bg color when hovering
    hide_tabs           = List(String(), default=[]) # list of tab ids to hide

    gallery             = String() # gallery to show on homepage

    # user related
    admins              = List(String()) # TODO: ref
    invited_admins      = List(String()) # list of invited admins who have not yet accepted TODO: ref
    subscribers         = List(String()) # TODO: ref

    # events
    events              = Dict(EventSchema(kls=Event))

    # image stuff
    sponsors            = List(Sponsor())

    # registration_form
    registration_form   = List(RegistrationFieldSchema())
    registration_data   = Dict() # user => data

    # default mail templates
    mail_templates      = MailsSchema(default = {})


class Barcamp(Record):

    schema = BarcampSchema()
    _protected = ['event', 'schema', 'collection', '_protected', '_schemaless', 'default_values', 'admin_users', 'workflow_states', 'initial_workflow_state']
    initial_workflow_state = "created"
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'location'      : {},
        'workflow'      : "created",
        'events'        : {},
        'registration_form'        : [],
        'registration_data'        : {},
        'planning_pad_public'        : False,
        'background_color'      : '#fcfcfa',
        'link_color'            : '#337CBB',
        'text_color'            : '#333',

        'header_color'          : '#fff',
        'navbar_link_color'     : '#888',
        'navbar_active_bg'      : '#555',
        'navbar_active_color'   : '#eee',
        'navbar_border_color'   : '#f0f0f0',
        'navbar_hover_bg'       : '#f8f8f8',
        'hide_tabs'             : [],
        'hide_barcamp'          : False,
        'seo_description'       : '', 
        'seo_keywords'          : '',
    }

    workflow_states = {
        'created'       : ['public', 'deleted', 'canceled'],
        'public'        : ['created', 'registration', 'deleted', 'canceled'],
        'registration'  : ['deleted', 'canceled'],
        'canceled'      : ['deleted'],
    }

    def set_workflow(self, new_state):
        """set the workflow to a new state"""
        old_state = self.workflow
        if old_state is None:
            old_state = self.initial_workflow_state
        allowed_states = self.workflow_states[old_state]

        # check if transition is allowed
        if hasattr(self, "check_wf_"+new_state):
            m = getattr(self, "check_wf_"+new_state)
            if not m(old_state = old_state): # this should raise WorkflowError if not allowed otherwise return True
                raise WorkflowError(old_state = old_state, new_state = new_state) # fallback

        if new_state not in allowed_states:
            raise WorkflowError(old_state = old_state, new_state = new_state)

        # Trigger
        if hasattr(self, "on_wf_"+new_state):
            m = getattr(self, "on_wf_"+new_state)
            m(old_state = old_state)
        self.workflow = new_state

    def get_event(self, eid):
        """return the event for the given id or None"""
        e = self.events[eid]
        return Event(e, _barcamp = self)

    @property
    def eventlist(self):
        """return the events as a list sorted by date"""
        events = self.events.values()
        def s(a,b):
            return cmp(a['date'], b['date'])
        events.sort(s)
        events = [Event(e, _barcamp = self) for e in events]
        return events

    def is_registered(self, user, states=['going', 'maybe', 'waiting']):
        """check if the given user is registered in any event of this barcamp

        :param user: the user object to test
        :param states: give the list of states which count as registered (defaults to all)
        :returns: ``True`` or ``False``
        """
        if user is None: 
            return False
        uid = user.user_id
        for event in self.eventlist:
            if uid in event.participants and 'going' in states:
                return True
            elif uid in event.maybe and 'maybe' in states:
                return True
            elif uid in event.waiting_list and 'waiting' in states:
                return True
        return False

    @property
    def public(self):
        """return whether the barcamp is public or not"""
        return self.workflow in ['public', 'registration', 'canceled']

    def add_admin(self, user):
        """add a new admin to the invited admins list"""
        self.admins.append(unicode(user._id))

    def remove_admin_by_id(self, user_id):
        """remove an admin from the list of admins but only if the list is not empty then and the
        creator of the barcamp is still on it."""
        if unicode(user_id) == self.created_by:
            return
        if len(self.admins)<2:
            return
        self.admins.remove(unicode(user_id))

    def activate_admin(self, user):
        """activate an admin by moving from the invited to the actual list"""
        if user._id in self.invited_admins:
            self.invited_admins.remove(user._id)
            if user._id not in self.admins:
                self.admins.append(unicode(user._id))

    @property
    def admin_users(self):
        """return a list of user objects of the admin users"""
        ub = self._collection.md.app.module_map.userbase
        return list(ub.get_users_by_ids(self.admins))

    @property
    def subscriber_users(self):
        """return a list of user objects of the subscribed users"""
        ub = self._collection.md.app.module_map.userbase
        return list(ub.get_users_by_ids(self.subscribers))

    @property
    def event(self):
        """returns the main event object or None in case there is no event"""
        return {}
        raise NotImplemented
        if self.events == []:
            return None
        event = self.events[0]
        event._barcamp = self
        return event

    def get_events(self):
        """return the events wrapped in the ``Event`` class"""
        return [Event(e, _barcamp = self) for e in self.events]

    def add_event(self, event):
        """add an event"""

        if event.get("_id", None) is None:
            eid = event['_id'] = unicode(uuid.uuid4())
        else:
            eid = event['_id']
        self.events[eid] = event
        return event

    @property
    def state(self):
        """the same as the event state which we compute here for the main event.
        If multiple events are possible in the future then this will check all of the events

        If no event is present, ``planning`` will be returned.
        """

        if self.event is None:
            return "planning"
        return self.event.state

    def subscribe(self, user):
        """subscribe a user to the barcamp"""
        uid = unicode(user._id)
        if uid not in self.subscribers:
            self.subscribers.append(uid)
        self.put()

    def unsubscribe(self, user):
        """unsubscribe a user from the barcamp"""
        uid = unicode(user._id)
        if uid in self.subscribers:
            self.subscribers.remove(uid)
        self.put()




class Barcamps(Collection):

    data_class = Barcamp

    def by_slug(self, slug):
        """find a barcamp by slug"""
        return self.find_one({'slug' : slug})

    def get_by_user_id(self, user_id):
        """return all the barcamps the user is either participant, interested or an admin"""

    def before_serialize(self, obj):
        """make sure we have all required data for serializing"""

        ###
        ### remove all sessions which have no room or timeslot anymore
        ###

        for event in obj.eventlist:
            tt = event.get('timetable', {})
            rooms = tt.get('rooms', [])
            timeslots = tt.get('timeslots', [])

            all_idxs = [] # list of all possible indexes of room/time

            for room in rooms:
                for timeslot in timeslots:
                    all_idxs.append("%s@%s" %(room['id'], timeslot['time']))

            if 'sessions' in tt:
                sessions = {}
                for idx, session in tt['sessions'].items():
                    if idx in all_idxs:
                        sessions[idx] = session
                event['timetable']['sessions'] = sessions

        ###
        ### fix all the sids and slugs in the session plan
        ###
        for event in obj.eventlist:
            sessions = event.get('timetable', {}).get('sessions', {})

            # dict with all session slugs and their id except the new ones
            all_slugs = dict([(s['slug'], s['sid']) for s in sessions.values() if s['slug'] is not None])
            
            for session_idx, session in sessions.items():

                # compute sid if missing
                if session.get("sid", None) is None:
                    session['sid'] = unicode(uuid.uuid4())

                # compute slug if missing
                slugify = UniqueSlugify(separator='_', uids = all_slugs.keys(), max_length = 50, to_lower = True)
                orig_slug = session.get("slug", None)

                # we need a new slug if a) the slug is None (new) or 
                # b) another session with this slug exists already
                # we can solve all this with .get() as the default is None anyway
                my_sid = all_slugs.get(orig_slug, None) 
                if my_sid != session['sid']: # for new ones it's None != xyz
                    new_slug = slugify(session['title'])
                    session['slug'] = new_slug
                    all_slugs[new_slug] = session['sid'] 
                event['timetable']['sessions'][session_idx] = session

        return obj
