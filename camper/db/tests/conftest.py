from camper.db import Barcamp, Barcamps, BarcampSchema, Sessions, Comments
import pymongo
import datetime
from starflyer import AttributeMapper

DB_NAME = "camper_testing_78827628762"

def setup_db():
    db = pymongo.Connection()[DB_NAME]
    return db

def teardown_db(db):
    #pymongo.Connection().drop_database(DB_NAME)
    db.persons.remove()

def pytest_funcarg__db(request):
    return request.cached_setup(
        setup = setup_db,
        teardown = teardown_db,
        scope = "function")

def pytest_funcarg__config(request):
    """create a config with all the collections we need""" 
    db = request.getfuncargvalue("db")
    config = AttributeMapper()
    config.dbs = AttributeMapper()
    mydb = config.dbs.db = db
    config.dbs.barcamps = Barcamps(mydb.barcamps, app=None, config=config)
    config.dbs.sessions = Sessions(mydb.sessions, app=None, config=config)
    config.dbs.session_comments = Comments(mydb.session_comments, app=None, config=config)
    return config

def pytest_funcarg__barcamps(request):
    """return the barcamp collection"""
    config = request.getfuncargvalue("config")
    return config.dbs.barcamps

def pytest_funcarg__sessions(request):
    """return the sessions collection"""
    config = request.getfuncargvalue("config")
    return config.dbs.sessions
