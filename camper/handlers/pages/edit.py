#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin, ensure_page
from ..barcamp.base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *

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
    image           = UploadField(u"Bild (optional)")

class EditView(BarcampBaseHandler):
    """view for editing a page"""

    template = "pages/edit.html"

    @logged_in()
    @is_admin()
    @ensure_page()
    def get(self, slug = None, page_slug = None):
        """show the form and update the page"""
        form = EditForm(self.request.form, obj = self.page, config = self.config)
        if self.request.method=="POST":
            if form.validate():
                f = form.data
                self.page.update(f)
                self.page.put()
                self.flash("Seite bearbeitet", category="info")
                if self.barcamp is not None:
                    url = self.url_for("barcamp_page", slug = self.barcamp.slug, page_slug = self.page.slug)
                else:
                    url = self.url_for("page", page_slug = self.page.slug)
                return redirect(url)
            else:
                self.flash("Leider enthielt das Formular einen Fehler", category="error")
        return self.render(form = form)

    post = get



class LayoutView(BarcampBaseHandler):
    """change the layout of the page"""

    @logged_in()
    @is_admin()
    @asjson()
    def post(self, slug = None, page_slug = None):
        """change the layout"""
        layout = self.request.form.get("layout")
        self.page.set_layout(layout)
        self.page.put()
        return {"status" : "ok", "layout" : self.page.layout}


class PartialEditView(BarcampBaseHandler):
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


