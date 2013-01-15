from mongogogo import *
import datetime

__all__=["Barcamp", "BarcampSchema", "Barcamps"]

class Location(Schema):
    """a location described by name, lat and long"""
    name = String()
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

class EventSchema(Schema):
    """a sub schema describing one event"""
    name                = String(required=True)
    description         = String(required=True)
    start_date          = DateTime(required = True)
    end_date            = DateTime(required = True)
    location            = Location()
    participants        = List(String()) # TODO: ref
    waiting_list        = List(String()) # TODO: ref

class BarcampSchema(Schema):
    """main schema for a barcamp holding all information about core data, events etc."""

    created             = DateTime()
    updated             = DateTime()
    created_by          = String() # TODO: should be ref to user
    workflow            = String(required = True, default = "created") 
    public              = Boolean(default = False) 
    
    # base data
    name                = String(required = True)
    description         = String(required = True)
    slug                = String(required = True)
    registration_date   = Date() # date when the registration starts
    start_date          = Date(required = True)
    end_date            = Date(required = True)
    location            = Location()
    size                = Integer(default = 0) # amount of people allowed
    twitter             = String() # only the username
    hashtag             = String() 
    gplus               = String() 
    homepage            = String() # URL
    twitterwall         = String() # URL
    facebook            = String() # ID of the page for the like button

    # documentation
    planning_pad        = String() # ID of the planning etherpad
    documentation_pad   = String() # ID of the pad for documentation
    planning_pad_public = Boolean(default = False)
    blogposts           = List(BlogLinkSchema())

    # user related
    admins              = List(String()) # TODO: ref
    invited_admins      = List(String()) # list of invited admins who have not yet accepted TODO: ref 
    subscribers         = List(String()) # TODO: ref

    # events
    events              = List(EventSchema())

    # image stuff
    logo                = String() # asset id
    sponsors            = List(Sponsor())


class Event(AttributeMapper):
    """wraps event data with a class to provider more properties etc."""

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


class Barcamp(Record):

    schema = BarcampSchema()
    _protected = ['schema', 'collection', '_protected', '_schemaless', 'default_values', 'admin_users']
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'location'      : {},
        'events'        : [],
        'planning_pad_public'        : False,
    }

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
        """return a list of user objects of the admin users"""
        ub = self._collection.md.app.module_map.userbase
        return list(ub.get_users_by_ids(self.subscribers))

    @property
    def event(self):
        """returns the main event object or None in case there is no event"""
        if self.events == []:
            return None
        return Event(self.events[0])

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

    def before_serialize(self, obj):
        """update or create our event information before it's saved"""
        if obj.events == []:
            event = {}
        else:
            event = obj.events[0]
        event.update({
            'name' : obj.name,
            'description' : obj.description,
            'start_date' : obj.start_date,
            'end_date' : obj.end_date,
            'location' : obj.location,
        })
        if obj.events == []:
            obj.events.append(event)
        else:
            obj.events[0] = event
        return obj

