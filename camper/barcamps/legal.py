#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in, is_admin, is_participant
from .base import BarcampBaseHandler
from wtforms import *
from sfext.babel import T


class TOSView(BarcampBaseHandler):
    """shows terms of service"""

    template = "tos.html"
    action = "tos"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            **self.barcamp)



class CancelView(BarcampBaseHandler):
    """shows cancellation and refund policy"""

    template = "cancel.html"
    action = "cancel"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            **self.barcamp)

