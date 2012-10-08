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
        tag = """<a href="%s"><img src="%s" nwidth="600"></a>""" %(
            self.handler.url_for("barcamp", slug = self.barcamp.slug), 
            self.handler.url_for("barcamp_logo", slug = self.barcamp.slug))
        return [
            {'url'  : 'http://comlounge.net',
             'name' : 'COM.lounge',
             'image'  : tag
            },
            {'url'  : 'http://comlounge.net',
             'name' : 'COM.lounge',
             'image'  : tag
            },
        ]
        


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
