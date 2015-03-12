#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper.handlers.forms import *
import werkzeug.exceptions
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
from camper.handlers.forms import *


class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")



class SponsorsView(BarcampBaseHandler):
    """shows the lists of subscribers, participants, waiting list"""

    template = "sponsors.html"

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        form = SponsorForm(self.request.form, config = self.config)
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            sponsor_form = form,
            title = self.barcamp.name,
            **self.barcamp)

    @logged_in()
    @is_admin()
    @ensure_barcamp()
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
            self.flash("Leider enthielt das Formular einen Fehler", category="danger")
        return redirect(self.url_for("barcamps.sponsors", slug = self.barcamp.slug))

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))

