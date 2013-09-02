from camper.db import BarcampSchema, Barcamp
import datetime

def test_get_empty_registration_form(barcamps, barcamp):
    barcamps.save(barcamp)
    barcamp = barcamps.by_slug("barcamp")
    assert barcamp.registration_form == []

def test_add_to_registration_form(barcamps, barcamp):
    barcamps.save(barcamp)
    field = {
        'name'      : 'fullname',
        'title'     : 'Your full name, please',
        'fieldtype' : 'textfield',
        'description' : 'enter your full name here',
        'required' : False,
    }
    barcamp = barcamps.by_slug("barcamp")
    barcamp.registration_form.append(field)
    barcamp.save()
    barcamp = barcamps.by_slug("barcamp")
    assert len(barcamp.registration_form) == 1

def test_save_registration_data(barcamps, barcamp):
    barcamps.save(barcamp)

    # create the field
    field = {
        'name'      : 'fullname',
        'title'     : 'Your full name, please',
        'fieldtype' : 'textfield',
        'description' : 'enter your full name here',
        'required' : False,
    }
    barcamp = barcamps.by_slug("barcamp")
    barcamp.registration_form.append(field)
    barcamp.save()
    barcamp = barcamps.by_slug("barcamp")

    # use the field
    assert len(barcamp.registration_form) == 1

