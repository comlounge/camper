#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin
from wtforms import *

__all__ = ['PageAddForm', 'AddView']

class EditForm(BaseForm):
    """form for adding a barcamp"""
    title           = TextField(u"Titel", [validators.Length(max=300), validators.Required()],
                description = u'Titel der Seite (max. 300 Zeichen)',)
    menu_title      = TextField(u"Menü-Titel", [validators.Length(max=50), validators.Required()],
                description = u'Titel der Seite im Menü (max. 50 Zeichen)',)
    slug            = TextField(u"URL-Name", [validators.Length(max=20), validators.Required()],
                description = u'Bezeichnung in der URL (keine Leerzeichen, max. 20 Zeichen, muss eindeutig sein)',)
    content         = TextAreaField(u"Inhalt der Seite", [validators.Required()],
                description = u'Der eigentlich Text-Inhalt der Seite. Bestimmtes Markup kann verwendet werden.',)

class PartialEditView(BaseHandler):
    """shows an inline form element for the field given and stores the result of the edit back via AJAX."""

    #template = "pages/partialform.html"

    @logged_in()
    @is_admin()
    @asjson()
    def get(self, slug = None, page_slug = None):
        """render the partial for, view and return it as JSON"""
        form = EditForm(self.request.form, obj = self.page, config = self.config)
        field = self.request.args.get("field", None)
        if field not in form:
            return {}
        return {
            'html' : form[field]()
        }

    post = get


