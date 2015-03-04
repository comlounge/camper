from starflyer import Handler, redirect, asjson
import werkzeug.exceptions
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler

from wtforms import *
from camper.handlers.forms import *
from sfext.babel import T
from camper.form import MyDateField, ATextInput, ACheckboxInput, ATextArea

__all__=['AddView']

class EntryAddForm(BaseForm):
    """form for adding an event to a barcamp"""
    title                = TextField(T(u"Title"), [validators.Length(max=300), validators.Required()],
                widget=ATextInput(),
                description = T(u'Title of the blog post (required)'),
    )

    content                 = TextAreaField(T(u"Content"), [],
                description = T(u'The content of the blog post'),
                widget = ATextArea()
    )
    image               = UploadField(T(u"Title image"))



class AddView(BarcampBaseHandler):
    """view for adding a new blog entry"""

    template = "add.html"

    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = EntryAddForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            slug = f['slug'] = string2filename(f['title'])
            # TODO: check if it's double
            f['menu_title'] = f['title'][:50]
            f['content'] = ""
            page = db.Page(f)
            page = self.config.dbs.pages.add_to_slot(slot, page, barcamp = self.barcamp)
            self.flash("Seite wurde wurde angelegt", category="info")
            if self.barcamp is not None:
                url = self.url_for("page_edit", slug = self.barcamp.slug, page_slug = slug)
            else:
                url = self.url_for("page", page_slug = slug)
            return self.render(tmplname = "redirect.html", url = url)
        return self.render(form = form)

    post = get

