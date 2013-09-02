#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in, is_admin, is_participant
from .base import BarcampBaseHandler
from wtforms import *
from sfext.babel import T
    
class LocationView(BarcampBaseHandler):
    """shows the location of the barcamp"""

    template = "location.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            title = self.barcamp.name,
            **self.barcamp)

