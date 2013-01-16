#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in, is_admin, is_participant
from base import BarcampView
from wtforms import *
from sfext.babel import T
    
class LocationView(BaseHandler):
    """shows the location of the barcamp"""

    template = "barcamp/location.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = BarcampView(self.barcamp, self), 
            barcamp = self.barcamp,
            title = self.barcamp.name,
            **self.barcamp)

