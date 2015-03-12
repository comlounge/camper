from starflyer import Handler, redirect, asjson
from bson import ObjectId
import werkzeug.exceptions
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
from camper.utils import string2filename
from base import EntryView


from add import EntryForm

__all__=['EditView']

class EditView(BarcampBaseHandler):
    """view for editing a blog entry"""

    template = "edit.html"

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None, eid = None):
        """render the view"""
        entry = self.config.dbs.blog.get(ObjectId(eid))
        view = EntryView(entry, self)
        form = EntryForm(self.request.form, obj = entry, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            slug = f['slug'] = string2filename(f['title'])
            entry.update(f)
            entry.save()
            self.flash(self._("The blog entry was updated"), category="info")
            url = self.url_for("blog.entries", slug = self.barcamp.slug)
            return redirect(url)
        return self.render(form = form, view = view)

    post = get

