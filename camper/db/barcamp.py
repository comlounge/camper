from mongogogo import *
import datetime
from camper.exceptions import *
import isodate
import pycountry

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
    

class EventSchema(Schema):
    """a sub schema describing one event"""
    _id                 = String(required=True)
    name                = String(required=True)
    description         = String(required=True)
    date                = DateTime()
    start_time          = String()
    end_time            = String()
    location            = LocationSchema(kls = Location)
    participants        = List(String()) # TODO: ref
    size                = Integer()
    maybe               = List(String()) # we maybe will implement this
    waiting_list        = List(String()) # TODO: ref
    own_location        = Boolean() # flag if the barcamp address is used or not 
    timetable           = Dict(default={}) # will be stored as dict with rooms and timeslots and sessions



class Event(Record):
    """wraps event data with a class to provider more properties etc."""

    schema = EventSchema()
    _protected = ['barcamp']

    def __init__(self, *args, **kwargs):
        """initialize the event"""
        super(Event, self).__init__(*args, **kwargs)
        self.barcamp = None

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
            if not force and len(self.participants) >= self.size:
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
        slots = self.timetable.get('timeslots', [])
        for slot in slots:
            slot['time'] = isodate.parse_datetime(slot['time'])
        return slots



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
    mail_templates      = MailsSchema()


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
        'seo_keywords'          : ''


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
        return Event(e)

    @property
    def eventlist(self):
        """return the events as a list sorted by date"""
        events = self.events.values()
        def s(a,b):
            return cmp(a['date'], b['date'])
        events.sort(s)
        events = [Event(e) for e in events]
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
        event.barcamp = self
        return event

    def get_events(self):
        """return the events wrapped in the ``Event`` class"""
        return [Event(e) for e in self.events]

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


