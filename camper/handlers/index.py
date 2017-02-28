#encoding=utf8

import datetime
import pymongo

from camper import BaseHandler
from ..base import BarcampView

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
        }).sort("start_date", pymongo.ASCENDING).limit(115)
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
            'hide_barcamp'  : False
        }).sort("start_date", pymongo.ASCENDING)
        past_barcamps = [BarcampView(barcamp, self) for barcamp in past_barcamps]
        return self.render( 
            past_barcamps = past_barcamps,
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

