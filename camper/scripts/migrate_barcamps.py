import argparse
import pymongo
import uuid
import datetime
import pprint
import copy
from datetime import timedelta
from starflyer import ScriptBase
from camper.app import markdownify

from logbook import Logger
log = Logger('Migration')


def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)+1):
        yield start_date + timedelta(n)


class MigrateBarcamps(ScriptBase):
    """script for migrating barcamps to new event format"""

    def fix_event(self, e):
        """add all the missing fields to the initial event"""
        size = self.barcamp['size']
        e = copy.copy(e) # better work with a copy

        if not e.has_key("_id"):
            e['_id'] = unicode(uuid.uuid4())
            log.info("id added,")
        if not e.has_key("size"):
            e['size'] = size
            log.info("size added,")
        if not e.has_key("timetable"):
            e['timetable'] = {}
            log.info("timetable added")
        if not e.has_key("maybe"):
            e['maybe'] = []
            log.info("maybe added",)
        if not e.has_key("own_location"):
            e['own_location'] = False
            log.info("own location set")
        return e

    def generate_events(self, e):
        """use the given event and generate copies of that for every day of the barcamp"""
        if e['start_date'] is None:
            events = {}
        else:
            events = {}
            for single_date in daterange(e['start_date'], e['end_date']):
                e = copy.copy(e)
                e['_id'] = unicode(uuid.uuid4())
                e['date'] = single_date
                e['start_time'] = "8:00"
                e['end_time'] = "18:00"
                events[e['_id']] = e

        self.barcamp['events'] = events
        return events

    def fix_location(self, e):
        """move the location from the event to the barcamp"""
        self.barcamp['location'] = e['location']
        log.info("location copied")


    def __call__(self):
        barcamps = self.app.config.dbs.db.barcamps
        # we  loop over raw data because the format cannot be serialized yet
        for b in barcamps.find():
            self.barcamp = b

            log.info("converting %s" %b['name'])

            # fix the single event to contain all necessary new fields
            e = b['events'][0]
            e = self.fix_event(e)

            # generate the events
            self.generate_events(e)

            # fix location (move it from event to barcamp)
            self.fix_location(e)

            # convert all markdown to html
            b['description'] = markdownify(b['description'])
            log.info("converted description")
            pages = self.app.config.dbs.pages.for_slot("menu", barcamp=self.barcamp)
            for page in pages:
                page.content = markdownify(page.content)
                page.save()
                log.info("converted page %s" %page.title)


            barcamps.save(b)
            log.info("barcamp %s saved" %self.barcamp['name'])

        

def migrate_barcamps(*args, **kwargs):
    s = MigrateBarcamps()
    s()
