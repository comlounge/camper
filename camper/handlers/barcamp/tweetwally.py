#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in, is_admin, is_participant
from .base import BarcampBaseHandler
from wtforms import *
from sfext.babel import T


class TweetWallyView(BarcampBaseHandler):
    """shows an embedded tweetwally view"""

    template = "tweetwally.html"
    action = "twitterwall"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            **self.barcamp)

