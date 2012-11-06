#encoding=utf8

import copy
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *

class BarcampEditForm(BaseForm):
    """form for adding a barcamp"""
    # base data
    name                = TextField(u"Titel", [validators.Length(max=300), validators.Required()],
                description = u'Jedes Barcamp braucht einen Titel. Beispiel: "Barcamp Aachen 2012", "JMStVCamp"',
    )
    
    description         = TextAreaField(u"Beschreibung", [validators.Required()],
                description = u'Bitte beschreibe Dein Barcamp hier',
    )
    slug                = TextField(u"URL-Name", [validators.Required()],
                description = u'Dies ist der Kurzname, der in der URL auftaucht. Er darf nur Buchstaben und Zahlen sowie die Zeichen _ und - enthalten. Beispiele wären "barcamp_aachen" oder "bcac"',
    )
    start_date          = DateField(u"Start-Datum", [validators.Required()], format="%d.%m.%Y")
    end_date            = DateField(u"End-Datum", [validators.Required()], format="%d.%m.%Y")
    location            = TextField(u"Ort", [validators.Required()], description = u'Gib hier den Hauptveranstaltungsort an.')

class EditView(BaseHandler):
    """an index handler"""

    template = "barcamp/edit.html"

    # TODO: slug should only be editable if barcamp not public

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        obj = copy.copy(self.barcamp)
        obj['location'] = self.barcamp.location['name']
        form = BarcampEditForm(self.request.form, obj = obj, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name' : f['location'],
                'lat' : 1,
                'lng' : 2
            }
            self.barcamp.update(f)
            self.barcamp.put()
            self.flash("Barcamp aktualisiert", category="info")
            return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
        return self.render(form = form)
    post = get

