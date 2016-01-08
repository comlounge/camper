from starflyer import Handler, redirect, asjson
from bson import ObjectId
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
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

        # get the gallery choices
        galleries = self.config.dbs.galleries.by_barcamp(self.barcamp)
        choices = [(str(g._id), g.title) for g in galleries ]
        choices.insert(0, ("-1", self._('do not show a gallery')))
        form.gallery.choices = choices

        if self.request.method == 'POST' and form.validate():
            f = form.data
            entry.update(f)
            if self.request.form.has_key("publish"):
                entry.workflow = "published"
            entry.save()
            self.flash(self._("The blog entry was updated"), category="info")
            url = self.url_for("blog.entries", slug = self.barcamp.slug)
            return redirect(url)
        return self.render(form = form, view = view, entry = entry)

    post = get

