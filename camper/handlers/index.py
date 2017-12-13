#encoding=utf8

import datetime
import pymongo
from bson.code import Code


from camper import BaseHandler
from ..base import BarcampView, logged_in

from starflyer import redirect

class IndexView(BaseHandler):
    """an index handler"""

    template = "index.html"

    def get(self):
        """render the view"""

        
        n = datetime.datetime.now()
        td = datetime.timedelta(days = 1)
        soon_barcamps = self.config.dbs.barcamps.find({
            'end_date'  : {'$gt': n-td},
        }).sort("end_date", pymongo.ASCENDING).limit(115)
        new_barcamps = self.config.dbs.barcamps.find({
            'end_date'  : {'$gt': n-td},
        }).sort("created",pymongo.DESCENDING).limit(3)
        if self.logged_in:
            my_barcamps = self.config.dbs.barcamps.find({
                'admins'  : {'$in': [self.user_id]},
            }).sort("created",pymongo.DESCENDING)
        else:
            my_barcamps = None
        soon_barcamps = [BarcampView(barcamp, self) for barcamp in soon_barcamps if not barcamp.hide_barcamp]
        soon_barcamps = [b  for b in soon_barcamps if b.barcamp.public or b.is_admin or self.is_main_admin]
        new_barcamps = [BarcampView(barcamp, self) for barcamp in new_barcamps if not barcamp.hide_barcamp]
        new_barcamps = [b  for b in new_barcamps if b.barcamp.public or b.is_admin or self.is_main_admin]
        if my_barcamps:
            my_barcamps = [BarcampView(barcamp, self) for barcamp in my_barcamps]
            my_barcamps = [b for b in my_barcamps if b.barcamp.public or b.is_admin or self.is_main_admin]
        return self.render( 
            soon_barcamps = soon_barcamps,
            new_barcamps = new_barcamps,
            my_barcamps = my_barcamps,
        )

class PastBarcampsView(BaseHandler):
    """an index handler"""

    template = "past_barcamps.html"

    def get(self):
        """render the view"""

        n = datetime.datetime.now()
        td = datetime.timedelta(days = 1)
        past_barcamps = self.config.dbs.barcamps.find({
            'end_date'      : {'$lt': n-td},
            'workflow'      : {'$in' : ['public', 'registration']},
            '$or'           : [
                                { 'hide_barcamp'  : False },
                                { 'hide_barcamp' : { '$exists' : False} }
                              ]
        }).sort("end_date", pymongo.DESCENDING)
        past_barcamps = [BarcampView(barcamp, self) for barcamp in past_barcamps]
        return self.render( 
            past_barcamps = past_barcamps,
        )

class OwnBarcampsView(BaseHandler):
    """show the barcamps you attend(ed)"""

    template = "own_barcamps.html"

    @logged_in()
    def get(self):
        """render the view"""

        # prepare the map reduce functions
        uid = self.user_id

        map = Code("""
            function () {
                for (var eid in this.events) {
                    var event = this.events[eid];
                    if (event.participants.indexOf('%s')>-1) {
                        emit(this._id, 1);
                    }
                }
            }
        """ %uid )

        reduce = Code("""
            function(key, values) {
                var total = 0;
                for (var i=0; i < values.length; i++) {
                    total += values[i];
                }
                return total;
            }
        """)

        result = self.config.dbs.db.barcamps.inline_map_reduce(map, reduce)
        ids = [u['_id'] for u in result]
        query = {'_id' : {'$in' : ids}}

        barcamps = self.config.dbs.barcamps.find(query)
        own_barcamps = [BarcampView(barcamp, self) for barcamp in barcamps]

        return self.render( 
            own_barcamps = own_barcamps,
        )


class LoginSuccess(IndexView):
    """login success screen with eventual redirect to came_from"""

    def get(self):
        """render the login success view"""

        # do we have a came_from situation? only process when coming via login
        if self.session.has_key("came_from"):
            url = self.session['came_from']
            del self.session['came_from']
    
            return redirect(url)

        return super(LoginSuccess, self).get()




class Impressum(BaseHandler):
    """show the impressum"""

    template = "impressum.html"

    def get(self):
        """render the view"""
        return self.render()

