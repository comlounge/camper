from mongogogo import *
import datetime

__all__=["Barcamp", "BarcampSchema", "Barcamps"]

class Location(Schema):
    """a location described by name, lat and long"""
    name = String()
    lat = Float()
    lng = Float()

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
    
    # base data
    name                = String(required = True)
    description         = String(required = True)
    slug                = String(required = True)
    start_date          = Date(required = True)
    end_date            = Date(required = True)
    location            = Location()

    # user related
    admins              = List(String()) # TODO: ref
    subscribers         = List(String()) # TODO: ref

    # events
    events              = List(Event)


class Barcamp(Record):

    schema = BarcampSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'location'      : {},
        'events'        : [],
    }


class Barcamps(Collection):
    
    data_class = Barcamp




