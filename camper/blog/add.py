from starflyer import redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
import werkzeug.exceptions
from camper import BaseForm, db
from camper.barcamps.base import BarcampBaseHandler

from wtforms import *
from camper.handlers.forms import *
from sfext.babel import T
from camper.form import MyDateField, ATextInput, ACheckboxInput, ATextArea

__all__=['AddView', 'EntryForm']

class EntryForm(BaseForm):
    """form for adding an event to a barcamp"""
    title       = TextField(T(u"Title"), [validators.Length(max=300), validators.Required()],
                widget=ATextInput(),
                description = T(u'Title of the blog post (required)'),
    )
    content     = TextAreaField(T(u"Content"), [],
                description = T(u'The content of the blog post'),
                widget = ATextArea()
    )
    published   = DateTimePickerField(T(u"Publishing Date"),
                default = None,
                description = T(u"Specify when the date this blog post should be published at")
    )
    image       = UploadField(T(u"Title image"))



class AddView(BarcampBaseHandler):
    """view for adding a new blog entry"""

    template = "add.html"

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = EntryForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            entry = db.BlogEntry(f)
            entry.created_by = self.user_id
            entry = self.config.dbs.blog.add(entry, barcamp = self.barcamp)
            self.flash(self._("The blog entry was created"), category="info")
            url = self.url_for("blog.entries", slug = self.barcamp.slug)
            return redirect(url)
        return self.render(form = form)

    post = get

