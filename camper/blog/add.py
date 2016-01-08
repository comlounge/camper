from starflyer import redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
import werkzeug.exceptions
from camper import BaseForm, db
from camper.barcamps.base import BarcampBaseHandler

from wtforms import *
from camper.handlers.forms import *
from sfext.babel import T
from camper.form import MyDateField

__all__=['AddView', 'EntryForm']

class EntryForm(BaseForm):
    """form for adding an event to a barcamp"""
    title       = TextField(T(u"Title"), [validators.Length(max=300), validators.Required()])
    content     = WYSIWYGField(T(u"Content"), [])
    published   = DateTimePickerField(T(u"Publishing Date"),
                default = None,
    )
    image       = UploadField(T(u"Title image"))
    gallery     = SelectField(T(u'Gallery to show on homepage'), default = -1)


class AddView(BarcampBaseHandler):
    """view for adding a new blog entry"""

    template = "add.html"

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = EntryForm(self.request.form, config = self.config)

        # get the gallery choices
        galleries = self.config.dbs.galleries.by_barcamp(self.barcamp)
        choices = [(str(g._id), g.title) for g in galleries ]
        choices.insert(0, ("-1", self._('do not show a gallery')))
        form.gallery.choices = choices

        if self.request.method == 'POST' and form.validate():
            f = form.data
            entry = db.BlogEntry(f)
            entry.created_by = self.user_id
            if self.request.form.has_key("publish"):
                entry.workflow = "published"
            entry = self.config.dbs.blog.add(entry, barcamp = self.barcamp)
            self.flash(self._("The blog entry was created"), category="info")
            url = self.url_for("blog.entries", slug = self.barcamp.slug)
            return redirect(url)
        return self.render(form = form)

    post = get

