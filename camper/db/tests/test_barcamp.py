from camper.db import BarcampSchema, Barcamp, Event
import datetime

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




    
