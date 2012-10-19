from mongogogo import *
import datetime

__all__=["Session", "Sessions"]

class CommentSchema(Schema):
    user_id = String(required = True)
    comment = String(required = True)

class SessionSchema(Schema):
    """a location described by name, lat and long"""

    created             = DateTime()
    updated             = DateTime()

    title = String(required = True)
    description = String()
    user_id = String(required = True)
    barcamp_id = String(required = True)
    comments = List(CommentSchema())
    vote_count = Integer()
    voted_for = List(String()) # list of user ids

class Session(Record):

    schema = SessionSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'title'         : "",
        'description'   : "",
        'comments'      : "",
        'vote_count'    : 0,
        'voted_for'     : [],
    }

    @property
    def user(self):
        """return the user corresponding to the userid"""
        return self._collection.md.app.module_map.userbase.get_user_by_id(self.user_id)

    def has_voted(self, user_id):
        """return True/False depending if user has voted for this session"""
        return user_id in self.voted_for

class Sessions(Collection):
    
    data_class = Session




