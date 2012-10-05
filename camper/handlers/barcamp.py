#encoding=utf8

from starflyer import Handler
from camper import BaseForm
from wtforms import *

class BarcampAddForm(BaseForm):
    """form for adding a barcamp"""
    #created_by          = String() # TODO: should be ref to user
    
    # base data
    name                = TextField(u"Titel", [validators.Length(max=300), validators.Required()],
                description = u'Jedes Barcamp braucht einen Titel. Beispiel: "Barcamp Aachen 2012", "JMStVCamp"',
    )
    
    description         = TextAreaField(u"Beschreibung", [validators.Required()],
                description = u'Bitte beschriebe Dein Barcamp hier',
    )
    slug                = TextField(u"URL-Name", [validators.Required()],
                description = u'Dies ist der Kurzname, der in der URL auftaucht. Er darf nur Buchstaben und Zahlen sowie die Zeichen _ und - enthalten. Beispiele wären "barcamp_aachen" oder "bcac"',
    )
    start_date          = DateField(u"Start-Datum", [validators.Required()])
    end_date            = DateField(u"End-Datum", [validators.Required()])
    location            = TextField(u"Ort", [validators.Required()],
                description = u'Gib hier den Hauptveranstaltungsort an.',
    )

class AddView(Handler):
    """an index handler"""

    template = "barcamp_add.html"

    def get(self):
        """render the view"""
        form = BarcampAddForm()
        return self.render(form = form)
    post = get
