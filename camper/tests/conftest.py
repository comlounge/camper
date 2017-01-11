import camper.app
from starflyer import AttributeMapper
import werkzeug
import ConfigParser
import pytest
import pprint
import datetime

#def pytest_addoption(parser):
    #parser.addoption("--config", action="store", default="etc/test.ini",
        #help="path to test configuratin file")

@pytest.fixture(scope="session")
def config(request):
    """read the test config"""
    return {
        'mongodb_url'  : 'mongodb://127.0.0.1:27017/camper_test_database_do_not_use',
        'modules.userbase.mongodb_name'  : 'camper_test_database_do_not_use',
        'testing'       : True,
        'debug'         : True,
    }

def create_user(app, username="user"):
    """create a user with username=pw and email=<username>@example.org"""
    return app.module_map['userbase'].register({
        'username' : username,
        'password' : username,
        'fullname' : username,
        'email' : "%s@example.com" %username,
    }, force = True, create_pw = False)


@pytest.fixture
def app(request, config):
    app = camper.app.test_app({},**config)
    app.testdata = AttributeMapper() # for testing purposes
    app.testdata.users = AttributeMapper()
    app.testdata.users.admin = create_user(app, "admin") # TODO: actually make this user an admin
    app.testdata.users.user = create_user(app, "user")
    def fin():
        """finalizer to delete the database again"""
        app.config.dbs.db.users.remove()
        app.config.dbs.db.barcamps.remove()
        app.config.dbs.db.sessions.remove()
        app.config.dbs.db.pages.remove()
        app.config.dbs.db.session_comments.remove()
        app.config.dbs.db.assets.remove()
    request.addfinalizer(fin)
    return app

@pytest.fixture
def barcamp(request, app):
    """create a barcamp with some basic data"""
    data = {
        'admins' : str(app.testdata.users['user']._id),
        'created_by' : str(app.testdata.users['user']._id),
        'subscribers' : [str(app.testdata.users['user']._id)],
        'slug' : "test",
        'name' : "TestCamp",
        'description' : "description of TestCamp",
        'size' : 5,
        'start_date' : datetime.datetime.now(),
        'end_date' : datetime.datetime.now(),
        'location' : {
            'name'      : "Test",
            'street'    : "Teststreet",
            'city'      : "City of Test",
            'zip'       : "12453",
            'description' : "cool location",
            'country'   : 'Country of Test',
        }
    }
    barcamp = app.config.dbs.barcamps(data)
    barcamp.save()
    return barcamp

@pytest.fixture
def client(request, app):
    return werkzeug.Client(app, werkzeug.BaseResponse)                                                                                                                                                                      


