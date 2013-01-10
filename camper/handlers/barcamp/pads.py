#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in, is_admin
from base import BarcampView

class PlanningPadView(BaseHandler):
    """shows the main page of a barcamp"""

    template = "barcamp/pad.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        if not self.barcamp.planning_pad_public and not self.is_admin:
            self.flash(self._(self._('You are not allowed to access this page as you are not an administrator of this barcamp.')), category="danger")
            return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
        return self.render(
            view = BarcampView(self.barcamp, self), 
            barcamp = self.barcamp,
            show_public_switch = True,
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

class PadPublicToggleView(BaseHandler): 
    """handler for toggeling the public switch for the planning pad"""

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def post(self, slug = None):
        self.barcamp.planning_pad_public = not self.barcamp.planning_pad_public
        self.barcamp.put()
        return redirect(self.url_for("barcamp_planning_pad", slug = self.barcamp.slug))
