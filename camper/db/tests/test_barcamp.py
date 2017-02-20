from camper.db import BarcampSchema, Barcamp, Event
import datetime
import pytest
from mongogogo import Invalid

def test_simple(barcamps):
    barcamp = Barcamp(
        name = "Barcamp",
        description = "cool barcamp",
        slug = "barcamp",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    barcamps.save(barcamp)

    barcamp = barcamps.by_slug("barcamp")
    assert barcamp.name == "Barcamp"
    assert barcamp.registration_date == None

def test_no_event_on_bc_creation(barcamps):
    barcamp = Barcamp(
        name = "Barcamp",
        description = "cool barcamp",
        slug = "barcamp",
        location = {
            'name' : "Example City",
        },
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    bc = barcamps.save(barcamp)

    bc = barcamps.get(bc._id)

    # there should be no events automatically anymore
    assert len(bc.events) == 0

def test_event(barcamps):

    barcamp = Barcamp(
        name = "Barcamp",
        description = "cool barcamp",
        slug = "barcamp",
        location = {
            'name' : "Example City",
        },
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )

    bc = barcamps.save(barcamp)
    bc = barcamps.get(bc._id)


    event = {
        'name'              : 'Day 1',
        'description'       : 'Description 1',
        'date'              : datetime.date(2012,7,13),
        'start_time'        : '10:00',
        'end_time'          : '18:00',
        'size'              : 10,
        'own_location'      : False,
    }
    event = barcamp.add_event(Event(event))
    eid = event['_id']

    bc = barcamps.save(barcamp)
    bc = barcamps.get(bc._id)

    assert bc.events[eid]['name'] == "Day 1"

### timetable testing

def test_broken_room(barcamp_with_event, barcamps):
    bc = barcamp_with_event
    room = {    
        #"id" : "9b20800d-be43-3604-8210-51bcaa90c05c",
        "capacity" : "2",
        "description" : "3",
        "name" : "room 1"
    }
    bc.eventlist[0]['timetable']['rooms'].append(room)
    pytest.raises(Invalid, barcamps.save, bc)

def test_broken_timeslot(barcamp_with_event, barcamps):
    bc = barcamp_with_event
    ts = {'foo' : 'bar'}
    bc.eventlist[0]['timetable']['timeslots'].append(ts)
    pytest.raises(Invalid, barcamps.save, bc)

def test_timeslot_defaults(barcamp_with_event, barcamps):
    bc = barcamp_with_event
    ts = {'time' : "11:00"}
    bc.eventlist[0]['timetable']['timeslots'].append(ts)

    bc = barcamps.save(bc)
    bc = barcamps.get(bc._id) 

    assert bc.eventlist[0].timetable['timeslots'][0]['blocked'] == False
    assert bc.eventlist[0].timetable['timeslots'][0]['reason'] == ""

def create_timetable():
    """create simple timetable"""
    rooms = [
        {
            "id" : "9b20800d-be43-3604-8210-51bcaa90c05c",
            "capacity" : "2",
            "description" : "3",
            "name" : "room 1"
        },
    ]
    timeslots = [
        {
            "reason" : "",
            "time" : "09:00"
        },
    ]
    sessions = {
        "9b20800d-be43-3604-8210-51bcaa90c05c@09:00" : {
            "description" : "An introduction",
            "title" : "Introduction",
            "moderator" : "Dr. FooBar",
            "_id" : "9b20800d-be43-3604-8210-51bcaa90c05c@09:00",
            "sid" : None,
            "slug" : None
        }
    }
    return {
        'rooms' : rooms,
        'timeslots' : timeslots,
        'sessions' : sessions
    }
    
def test_session_slug(barcamp_with_event, barcamps):

    bc = barcamp_with_event
    event = bc.eventlist[0]
    event['timetable'] = create_timetable()
    bc.add_event(event) # add it again to make sure we have the same event
    
    # after saving we should have valid slugs and sids
    bc = barcamps.save(bc)
    bc = barcamps.get(bc._id)

    assert bc.eventlist[0].timetable['sessions']['9b20800d-be43-3604-8210-51bcaa90c05c@09:00']['slug'] == "introduction"
    assert len(bc.eventlist[0].timetable['sessions']['9b20800d-be43-3604-8210-51bcaa90c05c@09:00']['sid']) == 36


def test_for_user(barcamps):
    """test if we return all the barcamps for a given user id"""
    barcamp = Barcamp(
        name = "Barcamp 1",
        description = "foobar",
        slug = "barcamp1",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    barcamps.save(barcamp)

    barcamp = Barcamp(
        name = "Barcamp 1",
        description = "foobar",
        slug = "barcamp2",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    barcamps.save(barcamp)

    barcamp = barcamps.by_slug("barcamp1")
    assert barcamp.slug == "barcamp1"




    
