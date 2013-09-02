#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from camper.handlers.forms import *
from .base import BarcampBaseHandler
import werkzeug.exceptions

class UserLists(BarcampBaseHandler):
    """shows the lists of subscribers, participants, waiting list"""

    template = "userlist.html"

    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            **self.barcamp)
