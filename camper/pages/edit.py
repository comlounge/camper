#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin, ensure_page
from ..barcamps.base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
from sfext.babel import T
from base import PageView


from add import PageForm


class EditView(BarcampBaseHandler):
    """view for editing a page"""

    template = "edit.html"

    @logged_in()
    @is_admin()
    @ensure_page()
    def get(self, slug = None, page_slug = None):
        """show the form and update the page"""
        view = PageView(self.page, self)
        form = PageForm(self.request.form, obj = self.page, config = self.config)
        if self.request.method=="POST":
            if form.validate():
                f = form.data
                self.page.update(f)
                self.page.put()
                self.flash(self._("page updated."), category="info")
                if self.barcamp is not None:
                    url = self.url_for("pages.barcamp_pages", slug = self.barcamp.slug)
                else:
                    url = self.url_for("page", page_slug = self.page.slug)
                return redirect(url)
            else:
                self.flash(self._("Unfortunately the form contains errors. Please fix them and try again."), category="danger")
        return self.render(form = form, page_slug = page_slug, view = view)

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


