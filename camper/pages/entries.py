from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from camper.barcamps.base import BarcampBaseHandler
from bson import ObjectId

__all__=['ListView']


class ListView(BarcampBaseHandler):
    """show all blog entries for a barcamp"""

    template = "entries.html"

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        entries = self.barcamp_view.pages_for("menu")
        return self.render(entries = entries)

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    @asjson()
    def delete(self, slug = None):
        """delete a page"""
        page = self.config.dbs.pages.by_slug(self.request.args['page_slug'], barcamp = self.barcamp)
        page.remove()
        return {'status' : 'ok'}
        
