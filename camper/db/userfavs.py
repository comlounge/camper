from mongogogo import *
import datetime
from HTMLParser import HTMLParser
from mongogogo.schema import Filter
import uuid

__all__=["UserFav", "UserFavs"]

class UserFavSchema(Schema):
    """ticket class in case ticket mode is enabled for a barcamp"""
    
    _id                 = String()  # UUID identifying the ticket class internally
    created             = DateTime()
    updated             = DateTime()
    user_id             = String()  # owner of the ticket
    barcamp_id          = String()  # uid if the barcamp we store session favs for
    event_id            = String()  # uid if the event of the barcamp we store session favs for
    session_id          = String()  # the session to fav
    

class UserFav(Record):
    """this record store all the favourited sessions for a user per barcamp"""

    schema = UserFavSchema()
    _protected = ['schema', 'collection', '_protected', '_schemaless', 'default_values']
    
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'sessions'      : [],
    }

class UserFavs(Collection):
    """stores all the user favourites"""

    data_class = UserFav

    def get_favs_for_bc(self, barcamp_id, user_id, event_id):
        """returns all the fav sessions per barcamp"""
        q = {
            'barcamp_id' : barcamp_id,
            'user_id' : user_id,
            'event_id' : event_id
        }

        return [s['session_id'] for s in list(self.find(q))]

    def toggle_fav(self, barcamp_id, user_id, event_id, session_id):
        """toggle a specific session's fav status for a user"""
        q = {
            'barcamp_id'    : barcamp_id,
            'user_id'       : user_id,
            'event_id'      : event_id,
            'session_id'    : session_id
        }
        r = self.find_one(q)
        if not r:
            q['_id'] = unicode(uuid.uuid4())
            fav = UserFav(q)
            fav = self.put(fav)
            print "added", fav
            return True # it exists now
        else:
            # deleting
            print r._id
            self.remove(r)
            return False





    
