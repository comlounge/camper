from camper.db import BarcampSchema, Barcamp
import datetime

def test_get_empty_registration_form(barcamps, barcamp):
    barcamps.save(barcamp)
    barcamp = barcamps.by_slug("barcamp")
    # registration_form now has a default optin_participant field
    assert len(barcamp.registration_form) == 1
    assert barcamp.registration_form[0]['name'] == 'optin_participant'
    assert barcamp.registration_form[0]['fieldtype'] == 'checkbox'

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
    # Should be 2: default optin_participant field + newly added fullname field
    assert len(barcamp.registration_form) == 2

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
    # Should be 2: default optin_participant field + newly added fullname field
    assert len(barcamp.registration_form) == 2

