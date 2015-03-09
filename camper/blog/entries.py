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
        return self.render(
            entries = self.config.dbs.blog.by_barcamp(self.barcamp)
        )


    @ensure_barcamp()
    @logged_in()
    @is_admin()
    @asjson()
    def delete(self, slug = None):
        """delete a blog entry"""
        eid = self.request.form['entry']
        entry = self.config.dbs.blog.get(ObjectId(eid))
        entry.remove()
        return {'status' : 'ok'}

