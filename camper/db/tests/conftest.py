from camper.db import Transaction, Transactions
import pymongo
import datetime

def pytest_funcarg__db(request):
    """return a database object"""
    conn = pymongo.Connection()
    db = conn.camper_testdatabase
    return db

def pytest_funcarg__barcamps(request):
    """return a database object"""
    db = request.getfuncargvalue("db")
    db.barcamps.remove()
    db.barcamps.counter.remove()
    return 


