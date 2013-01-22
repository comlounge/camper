from mongogogo import *
import datetime
from HTMLParser import HTMLParser
from mongogogo.schema import Filter

__all__=["Session", "Sessions", "Comment", "Comments"]

class MLStripper(HTMLParser):
    """html parser for stripping all tags from a string"""

    def __init__(self):
        self.reset()
        self.fed = []

    def handle_data(self, d):
        self.fed.append(d)

    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    """strip all html tags from the html string"""
    s = MLStripper()
    s.feed(html)
    return s.get_data()

class HTMLFilter(Filter):
    """schema filter to filter out html tags"""

    def __call__(self, value, data, **kw):
        return strip_tags(value)


class CommentSchema(Schema):
    created             = DateTime()
    updated             = DateTime()

    user_id = String(required = True)
    session_id = String(required = True)
    comment = String(required = True)

class SessionSchema(Schema):
    """a location described by name, lat and long"""

    created             = DateTime()
    updated             = DateTime()

    title = String(required = True, on_serialize=[HTMLFilter()])
    description = String(on_serialize=[HTMLFilter()])
    user_id = String(required = True)
    barcamp_id = String(required = True)
    vote_count = Integer()
    voted_for = List(String()) # list of user ids

class Session(Record):

    schema = SessionSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'title'         : "",
        'description'   : "",
        'vote_count'    : 0,
        'voted_for'     : [],
    }

    @property
    def user(self):
        """return the user corresponding to the userid"""
        return self._collection.md.app.module_map.userbase.get_user_by_id(self.user_id)

    @property
    def user_image(self):
        """return the user corresponding to the userid"""
        u = self.user
        uf = self._collection.md.app.url_for
        if u.image is not None:
            return uf("asset", asset_id = self._collection.md.app.module_map.uploader.get(self.user.image).variants['thumb']._id)
        else: 
            return None

    def has_voted(self, user_id):
        """return True/False depending if user has voted for this session"""
        return user_id in self.voted_for

    def add_comment(self, user_id, comment):
        """add a new comment to the session"""
        return self._collection.add_comment(self, user_id, comment)

    def vote(self, user_id):
        """add a vote to the session proposal"""
        if user_id not in self.voted_for:
            self.voted_for.append(unicode(user_id))
            self.vote_count = len(self.voted_for)
            self.save()
        return self.vote_count

    def unvote(self, user_id):
        """remove a vote from a session proposal"""
        user_id = unicode(user_id) # make sure it's not an objectid
        if user_id in self.voted_for:
            self.voted_for.remove(user_id)
            self.vote_count = len(self.voted_for)
            self.save()
        return self.vote_count

    def get_comments(self, sort_by="created", sort_order=-1):
        """return the list of comments for this session"""
        coll = self._collection.md.config.dbs.session_comments
        return list(coll.find({'session_id' : unicode(self._id)}).sort(sort_by, sort_order))

    def has_voted(self, user_id):
        """returns True/False depending if the user has voted for this proposal"""
        return unicode(user_id) in self.voted_for

class Sessions(Collection):
    
    data_class = Session

    def add_comment(self, session, user_id, comment):
        """add a new comment to the session"""
        comment = Comment(dict(
            user_id = user_id,
            session_id = session._id,
            comment = comment
        ))
        return self.md.config.dbs.session_comments.put(comment)

class Comment(Record):

    schema = CommentSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
    }


class Comments(Collection):
    
    data_class = Comment




