from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
from base import EntryView
import werkzeug.exceptions

__all__=['ListView', 'ArticleView']


class ListView(BarcampBaseHandler):
    """show all blog entries for a barcamp"""

    template = "view.html"

    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        entries = self.config.dbs.blog.by_barcamp(self.barcamp, only_published = not self.is_admin)
        return self.render(
            views = [EntryView(e,self) for e in entries],
            slug = slug,
        )

class ArticleView(BarcampBaseHandler):
    """show a single blog entry"""

    template = "entry.html"

    @ensure_barcamp()
    def get(self, slug = None, blog_slug = None):
        """render the view"""
        print blog_slug
        entry = self.config.dbs.blog.by_slug(blog_slug, barcamp=self.barcamp)
        print entry
        if entry is None:
            raise werkzeug.exceptions.NotFound()

        return self.render(
            view = EntryView(entry, self ),
            entry = entry,
            slug = slug,
        )

