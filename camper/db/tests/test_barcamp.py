from camper.db import BarcampSchema, Barcamp
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

    assert len(bc.events) == 1
    assert bc.events[0]['name'] == "Barcamp"




    
