import datetime
from userbase.db import User, UserSchema
from mongogogo import *
from uuid import uuid4


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

    new_email           = String()  # used for changing your email address
    new_email_code      = String()  # activation code for new email address
    new_email_date      = DateTime()    # date when email was changed

    registered_for      = Dict(default={})    # list of events of a barcamp the user to add to after activation

    deleted             = Boolean(default=False)


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
        "registered_for"    : {},
        "new_email"         : "",
        "new_email_code"    : "",
        "deleted"           : False,
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

    def set_new_email(self, email_address):
        """set up a new email address for the user

        you need to save the user afterwards

        :param email_address: the email address to be set
        :returns: a uuid code for sending to the user to verify
        """

        self.new_email = email_address
        self.new_email_date = datetime.datetime.now()
        self.new_email_code = unicode(uuid.uuid4())
        return self.new_email_code

    def verify_email_code(self, code):
        """verify the new email verification code

        returns True if it's ok and will set the new email addres

        you need to save the user object afterwards
        """

        now = datetime.datetime.now()

        if self.new_email_code == code and now-datetime.timedelta(hours=24) <= self.new_email_date and self.new_email_code != "":
            self.email = self.new_email
            self.new_email_code = ""
            self.new_email = ""
            return True
        else:
            return False


    def __eq__(self, other):
        """check if this user is equal to another one by checking the usernames. It also checks for the other one being None"""
        if other is None:
            return False
        return self.username == other.username

    def delete(self):
        """delete a user. 
        
        The following will happen then:

        - overwrite all personal information like twitter, facebook etc.
        - delete the email and password
        - mark the user as deleted
        - we keep the name because it should still be available for barcamp admins as it was rightfully recorded while registering
        """

        self.email         = unicode(uuid.uuid4())
        self.bio           = ""
        self.username      = unicode(uuid.uuid4())
        self.twitter       = ""
        self.facebook      = ""
        self.homepage      = ""
        self.tshirt        = ""
        self.organisation  = ""
        self.deleted       = True


