from camper.db import Barcamp, Barcamps, BarcampSchema
import pymongo
import datetime

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

def pytest_funcarg__barcamps(request):
    """return a database object"""
    db = request.getfuncargvalue("db")
    return Barcamps(db.barcamps)

