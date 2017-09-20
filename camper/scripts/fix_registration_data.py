import argparse
import pymongo
import uuid
import pprint
from starflyer import ScriptBase

"""
script to change the names of the registration fields to UUIDs

"""

class RegDataChanger(ScriptBase):
    """change all the registration data for one barcamp"""

    def extend_parser(self):
        """extend the change path script with necessary arguments"""

        self.parser.add_argument('--slug', required=True, help='slug of barcamp')
        
    def __call__(self):
        data = vars(self.args)
        slug = data['slug']
        barcamp = self.app.config.dbs.barcamps.by_slug(slug)
        if barcamp is None:
            print "the slug %s could not be found" %slug
            return

        # create a map of all the names and the new uids
        names = {}
        new_form = []
        for f in barcamp.registration_form:
            # change and store the name
            uid = unicode(uuid.uuid4())
            names[f['name']] = uid
            f['name'] = uid
            new_form.append(f)
        barcamp.registration_form = new_form
            
        # reprocess the registration data
        pprint.pprint(barcamp.registration_data)
        for eid, entry in barcamp.registration_data.items():
            for k in entry.keys():
                if k in names:
                    #print "success", k, names[k]
                    uid = names[k]
                    # just copy it
                    entry[uid] = entry[k]
                barcamp.registration_data[eid] = entry
        print "---"
        pprint.pprint(barcamp.registration_data)
        print "..."
        pprint.pprint(barcamp.registration_form)
        barcamp.save()
        
        

def fix_registration_data(*args, **kwargs):
    rdc = RegDataChanger()
    rdc()
