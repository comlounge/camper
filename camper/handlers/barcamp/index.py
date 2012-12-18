#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
from base import BarcampView
import werkzeug.exceptions

class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")


class View(BaseHandler):
    """shows the main page of a barcamp"""

    template = "barcamp/index.html"

    def get(self, slug = None):
        """render the view"""
        sponsor_form = SponsorForm(self.request.form, config = self.config)
        if not self.barcamp:
            raise werkzeug.exceptions.NotFound()
        return self.render(
            view = BarcampView(self.barcamp, self), 
            title = self.barcamp.name,
            sponsor_form = sponsor_form,
            **self.barcamp)


class BarcampSponsors(BaseHandler):
    """view for adding and deleting sponsors"""

    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """just add the sponsor and reload the page"""
        form = SponsorForm(self.request.form, config = self.config)
        if form.validate():
            f = form.data
            f['logo'] = f['image']['id']
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




