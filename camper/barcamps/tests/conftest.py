"""

Test support for handlers

"""

# reuse configuration options from database
from camper.db.tests.conftest import *
from camper.app import test_app
import werkzeug

env = werkzeug.test.EnvironBuilder(base_url="http://dev.localhost")

app_config = {
        'mongodb_name'          : "testcamper",
        'testing'               : True,
        'modules.userbase.mongodb_name' : "testcamper",
        'session_cookie_domain' : "dev.localhost",
}

def setup_app():
    return test_app({}, **app_config)

def teardown_app(app):
    #pymongo.Connection().drop_database(DB_NAME)
    app.config.dbs.db.barcamps.remove()
    app.config.dbs.db.users.remove()
    app.config.dbs.db.assets.remove()

def pytest_funcarg__app(request):
    return request.cached_setup(
        setup = setup_app,
        teardown = teardown_app,
        scope = "function")

def pytest_funcarg__client(request):
    app = request.getfuncargvalue('app')
    return app.test_client()

def pytest_funcarg__logged_in_client(request):
    app = request.getfuncargvalue('app')
    userbase = app.module_map['userbase']
    user = userbase.users({})
    user.update(dict(
        username = 'foo',
        password = 'bar',
        email = 'foo.bar@example.org'
    ))
    user.save()
    user.activate()
    user.save()

    client = app.test_client()
    r = client.post("/users/login", data = dict(
        username = "foo",
        password = "bar"
    ), follow_redirects = True, base_url="http://dev.localhost")
    return client


def pytest_funcarg__bclient(request):
    """client with user and barcamp"""
    app = request.getfuncargvalue('app')
    userbase = app.module_map['userbase']
    user = userbase.users()
    user.update(dict(
        username = 'foo',
        password = 'bar',
        email = 'foo.bar@example.org'
    ))
    user.save()
    user.activate()
    user.save()

    client = app.test_client()
    resp = client.post("/users/login", data = dict(
        username = "foo",
        password = "bar"
    ), follow_redirects = True, base_url="http://dev.localhost")
    resp  = client.post('/b/add', data=dict(
        name = "Barcamp 1",
        description = "this is barcamp 1",
        slug = "barcamp1",
        size = "10",
        start_date = "17.8.2012",
        end_date = "17.9.2012",
        location = "Aachen",
    ))
    return client

