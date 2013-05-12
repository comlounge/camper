class CamperException(Exception):
    """generic camper exception"""

    def __init__(self, msg="n/a", **kw):
        self.msg = msg
        self.kw = kw

    def __repr__(self):
        kwstring = ", ".join(["%s: %s" %item] for item in self.kw.items())
        return u"""<%s: %s, (%s)>""" %(self.__class__.__name__, self.msg, kwstring)

class BarcampNotFound(CamperException):
    """raised when a barcamp was not found"""

class ParticipantListFull(CamperException):
    """raised when trying to add a new user to a full participant list.

    This also means that instead the user has been added to the waiting list"""


    


