#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from .base import BarcampBaseHandler
from sfext.babel import T
import requests

class DeleteConfirmView(BarcampBaseHandler):
    """ask if you are sure to delete the barcamp"""

    template = "admin/delete.html"

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
        
        # delete blog entries
        blogs = self.config.dbs.blog._remove({'barcamp' : str(barcamp_id)})

        # delete galleries
        galleries = self.config.dbs.galleries._remove({'barcamp' : str(barcamp_id)})
        
        # delete participant data
        data = self.config.dbs.participant_data._remove({'barcamp_id' : str(barcamp_id)})
        
        # delete tickets
        data = self.config.dbs.tickets._remove({'barcamp_id' : str(barcamp_id)})

        # delete user favs
        data = self.config.dbs.userfavs._remove({'barcamp_id' : str(barcamp_id)})

        # delete barcamp
        self.barcamp.remove()
        self.flash(self._("The barcamp and all it's contents have been deleted!"), category="success")
        return redirect(self.url_for("index"))

