from camper.db import Session
import datetime

def test_create(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)

    session = sessions.get(session._id)
    assert session.title == "session title"
    assert session.description == "session description"
    assert session.user_id == "user"
    assert session.barcamp_id == "barcamp"
    assert session.created < datetime.datetime.now()
    assert session.vote_count == 0


def test_vote(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)

    count = session.vote("user")
    assert count == 1
    session = sessions.get(session._id)
    assert session.vote_count == 1


def test_vote_twice(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)

    count = session.vote("user")
    count = session.vote("user")
    assert count == 1
    session = sessions.get(session._id)
    assert session.vote_count == 1


def test_vote_two_users(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)

    count = session.vote("user")
    count = session.vote("user2")
    assert count == 2
    session = sessions.get(session._id)
    assert session.vote_count == 2


def test_vote_and_unvote(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)

    count = session.vote("user")
    assert count == 1

    session.unvote("user")
    session = sessions.get(session._id)
    assert session.vote_count == 0


def test_vote_and_unvote_by_user_who_has_not_voted(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)

    count = session.vote("user")
    assert count == 1

    session.unvote("user2")
    session = sessions.get(session._id)
    assert session.vote_count == 1

def test_comment_add(sessions):
    session = Session(
        user_id = "user",
        barcamp_id = "barcamp",
        title = "session title",
        description = "session description",
    )
    session = sessions.save(session)
    session = sessions.get(session._id)
    session.add_comment("user", "this is the comment")

    assert len(session.get_comments()) == 1
    




    
