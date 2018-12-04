import argparse
import pymongo
import uuid
import datetime
import pprint
import copy
from datetime import timedelta
from starflyer import ScriptBase
from camper.app import markdownify
from sfext.babel import T

from logbook import Logger
log = Logger('Migration')


def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)+1):
        yield start_date + timedelta(n)


optin_field = { 
    "title" : "Show on public participants list",
    "required" : False, 
    "description" : "Decide whether you want to be displayed on the public list of participants", 
    "name" : "optin_participant", 
    "fieldtype" : "checkbox" 
}

class MigrateBarcamps(ScriptBase):
    """adds the new participant optin field to all registration data objects which do not have it yet"""

    def __call__(self):
        barcamps = self.app.config.dbs.db.barcamps
        # we  loop over raw data because the format cannot be serialized yet
        for b in barcamps.find():
            self.barcamp = b

            f = b['registration_form']
            has_field = False
            for field in f:
                if field['name'] == "optin_participant":
                    has_field = True
                    log.info("no change in %s" %b['name'])
                    break

            if has_field:
                continue
                
            # add field at beginning

            f = [optin_field] + f
            b['registration_form'] = f

            log.info("converted %s" %b['name'])
            #pprint.pprint(f)

            barcamps.save(b)
            log.info("barcamp %s saved" %self.barcamp['name'])

        

def migrate_barcamps(*args, **kwargs):
    s = MigrateBarcamps()
    s()
