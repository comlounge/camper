#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
import requests
from camper import utils


class DashboardView(BarcampBaseHandler):
    """shows a simple dashboard"""

    template = "admin/dashboard.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        barcamp_id = self.barcamp._id
        sessions = self.config.dbs.sessions.find({'barcamp_id' : str(barcamp_id)})
        return self.render(sessioncount = sessions.count())

