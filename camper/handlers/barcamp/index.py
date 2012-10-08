#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from wtforms import *
import werkzeug.exceptions

class BarcampView(object):
    """wrapper around the barcamp to provide view functions"""

    def __init__(self, barcamp, handler):
        """initialize the adapter with the barcamp and the handler in use"""
        self.barcamp = barcamp
        self.handler = handler

    @property
    def logo(self):
        """show the logo tag"""
        return """<a href="%s"><img src="%s" nwidth="600"></a>""" %(
            self.handler.url_for("barcamp", slug = self.barcamp.slug), 
            self.handler.url_for("barcamp_logo", slug = self.barcamp.slug))

class View(BaseHandler):
    """shows the main page of a barcamp"""

    template = "barcamp/index.html"

    def get(self, slug = None):
        """render the view"""
        if not self.barcamp:
            raise werkzeug.exceptions.NotFound()
        return self.render(
            view = BarcampView(self.barcamp, self), 
            title = self.barcamp.name,
            **self.barcamp)
