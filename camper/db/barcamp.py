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

class Event(Schema):
    """a sub schema describing one event"""
    name                = String(required=True)
    description         = String(required=True)
    start_date          = DateTime(required = True)
    end_date            = DateTime(required = True)
    location            = Location()
    participants        = List(String()) # TODO: ref

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

    # user related
    admins              = List(String()) # TODO: ref
    invited_admins      = List(String()) # list of invited admins who have not yet accepted TODO: ref 
    subscribers         = List(String()) # TODO: ref
    participants        = List(String()) # TODO: ref
    waiting_list        = List(String()) # TODO: ref

    # events
    events              = List(Event)

    # image stuff
    logo                = String() # asset id
    sponsors            = List(Sponsor())


class Barcamp(Record):

    schema = BarcampSchema()
    _protected = ['schema', 'collection', '_protected', '_schemaless', 'default_values', 'admin_users']
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'location'      : {},
        'events'        : [],
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


class Barcamps(Collection):
    
    data_class = Barcamp

    def by_slug(self, slug):
        """find a barcamp by slug"""
        return self.find_one({'slug' : slug})


