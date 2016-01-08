import datetime
from userbase.db import User, UserSchema
from mongogogo import *


__all__ = ['CamperUser']

class CamperUserSchema(UserSchema):
    """extended user schema for camper"""

    bio                 = String()
    username            = String()
    twitter             = String()
    facebook            = String()
    homepage            = String()
    tshirt              = String()
    organisation        = String()
    image               = String()


class CamperUser(User):
    """custom user class for camper"""

    schema = CamperUserSchema()

    User.default_values.update({
        "bio"               : "",
        "twitter"           : "",
        "facebook"          : "",
        "homepage"          : "",
        "tshirt"            : "",
        "organisation"      : "",
        "image"             : "",
    })

    @property
    def has_twitter(self):
        """check if the user has the twitter field filled"""
        return self.twitter is not None and self.twitter.strip()!=""

    @property
    def twitter_link(self):
        if self.has_twitter:
            return "https://twitter.com/"+self.twitter
        return ""

    @property
    def has_bio(self):
        """check if the user has the bio field filled"""
        return self.bio is not None and self.bio.strip()!=""

    @property
    def has_facebook(self):
        """check if the user has the facebook field filled"""
        return self.facebook is not None and self.facebook.strip()!=""

    @property
    def has_organisation(self):
        return self.organisation is not None and self.organisation.strip()!=""

    @property
    def is_admin(self):
        """return if user is admin or not"""
        return self.has_permission("admin")

    @property
    def user_id(self):
        """return the user id as string"""
        return unicode(self._id)


    def __eq__(self, other):
        """check if this user is equal to another one by checking the usernames. It also checks for the other one being None"""
        if other is None:
            return False
        return self.username == other.username




# class CamperUserOld(User):
#     name = "CamperUser" # should be the same name as the class

#     structure = {
#         'bio'           : basestring,
#         'twitter'       : basestring, # only username
#         'facebook'      : basestring, # full link
#         'homepage'      : basestring, # url of homepage
#         'tshirt'        : basestring, # S, M, L , ...
#         'organisation'  : basestring, # the organisation a user belongs to
#         'image'         : basestring, # image of user, for now optional
#     }

#     @property
#     def has_twitter(self):
#         """check if the user has the twitter field filled"""
#         return self.twitter is not None and self.twitter.strip()!=""

#     @property
#     def twitter_link(self):
#         if self.has_twitter:
#             return "https://twitter.com/"+self.twitter
#         return ""

#     @property
#     def has_bio(self):
#         """check if the user has the bio field filled"""
#         return self.bio is not None and self.bio.strip()!=""

#     @property
#     def has_facebook(self):
#         """check if the user has the facebook field filled"""
#         return self.facebook is not None and self.facebook.strip()!=""

#     @property
#     def has_organisation(self):
#         return self.organisation is not None and self.organisation.strip()!=""

#     @property
#     def is_admin(self):
#         """return if user is admin or not"""
#         return self.has_permission("admin")

#     @property
#     def user_id(self):
#         """return the user id as string"""
#         return unicode(self._id)


#     def __eq__(self, other):
#         """check if this user is equal to another one by checking the usernames. It also checks for the other one being None"""
#         if other is None:
#             return False
#         return self.username == other.username
