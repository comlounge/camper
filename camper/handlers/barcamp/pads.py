#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, ensure_barcamp
from base import BarcampView

class PlanningPadView(BaseHandler):
    """shows the main page of a barcamp"""

    template = "barcamp/pad.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = BarcampView(self.barcamp, self), 
            barcamp = self.barcamp,
            pad = self.barcamp.planning_pad,
            title = self.barcamp.name,
            **self.barcamp)

class DocumentationPadView(BaseHandler):
    """shows documentation pad"""

    template = "barcamp/pad.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            view = BarcampView(self.barcamp, self), 
            barcamp = self.barcamp,
            pad = self.barcamp.documentation_pad,
            title = self.barcamp.name,
            **self.barcamp)

