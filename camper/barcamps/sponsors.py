#encoding=utf8
from starflyer import Handler, redirect, asjson
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
    name                = TextField(T(u"Name of sponsor"), [validators.Length(max=300), validators.Required()])
    url                 = TextField(T(u"URL of sponsor website"), [validators.URL(), validators.Required()])
    image               = UploadField(T(u"Sponsor Logo"))

class SponsorsView(BarcampBaseHandler):
    """shows the lists of subscribers, participants, waiting list"""

    template = "admin/sponsors.html"

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
            sort_url = self.url_for("barcamps.sponsors_sort", slug = slug),
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
            self.flash(self._('created new sponsor'), category="info")
        else:
            self.flash(self._('The form contains errors. Please correct them and try again.'), category="danger")
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

class SponsorsSort(BarcampBaseHandler):
    """sort the sponsors"""

    @asjson()
    @is_admin()
    @ensure_barcamp()
    def post(self, slug = None):
        """ajax handler for sorting the sponsors"""
        pids = self.request.form.get("pids").split(",")
        pids = [int(p.split("-")[1]) for p in pids]
        sponsors = self.barcamp.sponsors
        new_sponsors = [sponsors[i] for i in pids]
        self.barcamp.sponsors = new_sponsors
        self.barcamp.put()
        return {
            'success' : True,
            'pids'    : pids
        }