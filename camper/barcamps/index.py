#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
from .base import BarcampBaseHandler, SponsorForm

class View(BarcampBaseHandler):
    """shows the main page of a barcamp"""

    template = "index.html"
    action = "home"

    def get(self, slug = None):
        """render the view"""
        if not self.barcamp:
            raise werkzeug.exceptions.NotFound()
        return self.render(
            barcamp = self.barcamp,
            title = self.barcamp.name,
            **self.barcamp)


class BarcampSponsors(BarcampBaseHandler):
    """view for adding and deleting sponsors"""

    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """just add the sponsor and reload the page"""
        form = SponsorForm(self.request.form, config = self.config)
        if form.validate():
            f = form.data
            f['logo'] = f['image']
            del f['image']
            self.barcamp.sponsors.append(f)
            self.barcamp.put()
            self.flash("Neuen Sponsor angelegt", category="info")
        else:
            self.flash("Leider enthielt das Formular einen Fehler", category="error")
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))

    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))




