#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions

class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")

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

    @property
    def sponsors(self):
        res = []
        i = 0 
        for sponsor in self.barcamp.sponsors:
            tag = """<a href="%s"><img src="%s"></a>""" %(
                sponsor['url'],
                self.handler.url_for("asset", asset_id = sponsor['logo']))
            res.append(
                {'url'  : sponsor['url'],
                 'name'  : sponsor['name'],
                 'idx'  : i,
                 'image'  : tag
                })
            i=i+1
        return res

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

    # TODO: nur für admins
    # TODO: check, ob Barcamp gültig/vorhanden
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

    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))




