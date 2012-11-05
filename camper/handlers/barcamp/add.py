#encoding=utf8

from starflyer import Handler, redirect
from camper import BaseForm, db, logged_in
from wtforms import *

class BarcampAddForm(BaseForm):
    """form for adding a barcamp"""
    #created_by          = String() # TODO: should be ref to user
    
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
    location            = TextField(u"Ort", [validators.Required()],
                description = u'Gib hier den Hauptveranstaltungsort an.',
    )

class AddView(Handler):
    """an index handler"""

    template = "barcamp/add.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = BarcampAddForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name' : f['location'],
                'created_by' : self.user._id,
            }
            barcamp = db.Barcamp(f, collection = self.config.dbs.barcamps)
            barcamp = self.config.dbs.barcamps.put(barcamp)
            self.flash("Barcamp %s wurde angelegt" %f['name'], category="info")
            return redirect(self.url_for("index"))
        return self.render(form = form)
    post = get
