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

class Session(Record):

    schema = SessionSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'title'         : "",
        'description'   : "",
        'comments'      : "",
    }

    @property
    def user(self):
        """return the user corresponding to the userid"""
        return "TODO"

class Sessions(Collection):
    
    data_class = Session




