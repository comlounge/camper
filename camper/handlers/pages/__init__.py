import pageeditor

from wtforms import TextField, PasswordField, FieldList, BooleanField, IntegerField, DecimalField
from wtforms import SelectField, DateField, TextAreaField, HiddenField, FloatField, Field, FormField, Form
from wtforms import validators as v
from wtforms.widgets import html_params

class PageAddForm(BaseForm):
    """form for adding a barcamp"""
    # base data
    title       = TextField(u"Titel der Seite", [validators.Length(max=300), validators.Required()],
                    description = u'Der Titel der Seite, der auf der Seite selbst erscheinen soll',
    )
    menu_title  = TextField(u"Titel im Menü", [validators.Length(max=50), validators.Required()],
                    description = u'Der Titel, der in Menüs verwendet werden soll',
    )
    slug        = TextField(u"URL-Name", [validators.Required()],
                    description = u'Dies ist der Kurzname, der in der URL auftaucht. Er darf nur Buchstaben und Zahlen sowie die Zeichen _ und - enthalten. Beispiele wären "impressum" oder "ort"',
    )
    content     = TextAreaField(u"Seiteninhalt", [validators.Required()],
                    description = u'Der Inhalt der Seite',
    )
