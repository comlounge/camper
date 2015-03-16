from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
from base import EntryView

__all__=['ListView']


class ListView(BarcampBaseHandler):
    """show all blog entries for a barcamp"""

    template = "view.html"

    @logged_in()
    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""
        entries = self.config.dbs.blog.by_barcamp(self.barcamp)
        return self.render(
            views = [EntryView(e,self) for e in entries],
            slug = slug,
        )


