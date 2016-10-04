#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
from sfext.babel import T

__all__ = ['PageAddForm', 'AddView']

class PageAddForm(BaseForm):
    """form for adding a barcamp"""
    title           = TextField(T("Title"), [validators.Length(max=80), validators.Required()],
                description = T('title of the page (max. 80 characters)'),)

class PageForm(BaseForm):
    """page form"""
    title           = TextField(T("Title"), [validators.Length(max=80), validators.Required()],
                description = T('Page title (max. 80 characters)'),)
    layout           = RadioField(T("Layout"), [validators.Length(max=80), validators.Required()],
                choices = [
                    ('default', T("Image on top")),
                    ('left', T("Image on left side")),
                    ('right', T("Image on right side")),
                ],
                description = T('define how to layout the page'),)
    menu_title      = TextField(T("Menu title"), [validators.Length(max=30), validators.Required()],
                description = T('Page title in menu (max. 30 characters)'),)
    slug            = TextField(T("URL name"), [validators.Length(max=20), validators.Required()],
                description = T('short name in the URL (no spaces, max. 20 characters, needs to be unique)'),)
    content         = WYSIWYGField(T("Page Contents"), [],
                description = T('The actual contents of the page'),)
    image           = UploadField(T("Image (optional)"))



class AddView(BarcampBaseHandler):
    """handler for adding a new page"""

    template = "add.html"

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None, slot = None):
        """render the view"""
        form = PageForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['menu_title'] = f['title'][:30]
            page = db.Page(f)
            page = self.config.dbs.pages.add_to_slot(slot, page, barcamp = self.barcamp)
            self.flash("Seite wurde wurde angelegt", category="info")
            if self.barcamp is not None:
                url = self.url_for("pages.page_edit", slug = self.barcamp.slug, page_slug = f['slug'])
            else:
                url = self.url_for("page", page_slug = slug)
            return redirect(url)
        else:
            print form.errors
        return self.render(form = form)

    post = get


class SlugValidate(BarcampBaseHandler):
    """a handler for remote page data validation"""

    @logged_in()
    @asjson()
    def get(self, slug=None, page_slug = None):
        """retrieve the data via params and validate the given fields

        This can be used for both the add and edit view. On edit views it will
        make sure that e.g. a urlname is not checked against the edited barcamp
        itself.

        """
        if "slug" in self.request.args:
            if page_slug == self.request.args['slug']:
                # we are on the edit screen of the same page
                return {'validated' : True}
            bc = self.config.dbs.pages.by_slug(self.request.args['slug'], barcamp = self.barcamp)
            if bc is None:
                return {'validated' : True}
            if self.barcamp is not None and self.barcamp._id == bc._id:
                return {'validated' : True}
            return {
                'validated' : False,
                'msg' : self._("This name is already taken. Please choose a different one")
            }
        return {'validated': True}

