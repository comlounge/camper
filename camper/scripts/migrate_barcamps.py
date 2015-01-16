import argparse
import pymongo
import uuid
import pprint
import copy
from datetime import timedelta
from starflyer import ScriptBase

def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)+1):
        yield start_date + timedelta(n)


class MigrateBarcamps(ScriptBase):
    """script for migrating barcamps to new event format"""

    def __call__(self):
        db = self.app.config.dbs.db
        for b in db.barcamps.find():
            e = b['events'][0]
            size = b['size']
            print "converting", b['name']+":",
            if not e.has_key("_id"):
                e['_id'] = unicode(uuid.uuid4())
                print "id added,",
            if not e.has_key("size"):
                e['size'] = size
                print "size added,",
            if not e.has_key("timetable"):
                e['timetable'] = {}
                print "timetable added,", 
            if not e.has_key("maybe"):
                e['maybe'] = []
                print "maybe added", 
            if not e.has_key("own_location"):
                e['own_location'] = False
                print "own location set,", 

            # fix dates and eventually create more events
            e = copy.copy(e) # this is the master
            if e['start_date'] is None:
                events = []
            else:
                events = []
                for single_date in daterange(e['start_date'], e['end_date']):
                    e = copy.copy(e)
                    e['date'] = single_date
                    e['start_time'] = "8:00"
                    e['end_time'] = "18:00"
                    events.append(e)

            # now move location from event to barcamp as main location
            if not b.has_key("location"):
                b['location'] = e['location']
                e['location'] = {}
                b['events'][0] = e
                print "location copied,",
            b['events'] = events
            print
            db.barcamps.save(b)

        

def migrate_barcamps(*args, **kwargs):
    s = MigrateBarcamps()
    s()
