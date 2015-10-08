from camper.db import Barcamp, Barcamps, BarcampSchema, Sessions, Comments, Pages
import pymongo
import datetime
import pytest
from starflyer import AttributeMapper

def pytest_addoption(parser):
    parser.addoption("--mongo-url", action="store", default="")
    parser.addoption("--mongo-name", action="store", default="camper_testing_78827628762")


@pytest.fixture(scope="module")
def db(request):
    url = request.config.getoption("--mongo-url")
    name = request.config.getoption("--mongo-name")

    db = pymongo.MongoClient(url)[name]

    def fin():
        db.persons.remove()
        db.pages.remove()
        db.barcamps.remove()
        db.sessions.remove()
    request.addfinalizer(fin)
    return db
    
def pytest_funcarg__config(request):
    """create a config with all the collections we need""" 
    db = request.getfuncargvalue("db")
    config = AttributeMapper()
    config.dbs = AttributeMapper()
    mydb = config.dbs.db = db
    config.dbs.barcamps = Barcamps(mydb.barcamps, app=None, config=config)
    config.dbs.sessions = Sessions(mydb.sessions, app=None, config=config)
    config.dbs.pages = Pages(mydb.pages, app=None, config=config)
    config.dbs.session_comments = Comments(mydb.session_comments, app=None, config=config)
    return config

def pytest_funcarg__barcamps(request):
    """return the barcamp collection"""
    config = request.getfuncargvalue("config")
    return config.dbs.barcamps

def pytest_funcarg__pages(request):
    """return the barcamp collection"""
    config = request.getfuncargvalue("config")
    return config.dbs.pages

def pytest_funcarg__sessions(request):
    """return the sessions collection"""
    config = request.getfuncargvalue("config")
    return config.dbs.sessions

@pytest.fixture()
def barcamp(request):
    """example barcamp"""
    return Barcamp(
        name = "Barcamp",
        description = "cool barcamp",
        slug = "barcamp",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    
