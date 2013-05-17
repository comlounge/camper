#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from .base import BarcampBaseHandler
from sfext.babel import T
import requests

class DeleteConfirmView(BarcampBaseHandler):
    """ask if you are sure to delete the barcamp"""

    template = "barcamp/delete.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        return self.render()

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """render the view"""
        barcamp_id = self.barcamp._id

        # delete pages
        self.config.dbs.pages._remove({'barcamp' : unicode(self.barcamp._id)})
        
        # delete sessions
        sessions = self.config.dbs.sessions._remove({'barcamp_id' : str(barcamp_id)})
        
        # delete barcamp
        self.barcamp.remove()
        self.flash(self._("The barcamp and all it's contents have been deleted!"), category="success")
        return redirect(self.url_for("index"))

