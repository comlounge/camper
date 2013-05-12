from conftest import create_user
from camper import *
import pytest

def test_subscribe_user(barcamp, app):
    user = create_user(app, "user1")
    barcamp.subscribe(user)

    bc = app.get_barcamp("test")
    assert unicode(user._id) in bc.subscribers


def test_register_user_duplicate(barcamp, app):
    # we do this via the main event
    user = create_user(app, "user1")
    barcamp = app.get_barcamp("test") # retrieve it again to have an event initialized
    event = barcamp.event
    event.add_participant(user)
    event.add_participant(user)
    barcamp.save()

    bc = app.get_barcamp("test")
    assert unicode(user._id) in bc.event.participants
    assert len(bc.event.participants) == 1
    
def test_register_users_until_waitinglist(barcamp, app):
    users = []
    barcamp = app.get_barcamp("test") # retrieve it again to have an event initialized
    event = barcamp.event
    for i in range(1,6):
        user = create_user(app, "user1")
        users.append(unicode(user._id))
        event.add_participant(user)

    user = create_user(app, "user1")
    pytest.raises(ParticipantListFull, event.add_participant, user)
    barcamp.save()

    bc = app.get_barcamp("test")
    assert unicode(user._id) not in bc.event.participants
    assert unicode(user._id) in bc.event.waiting_list
    assert len(bc.event.participants) == 5
    assert len(bc.event.waiting_list) == 1
    


