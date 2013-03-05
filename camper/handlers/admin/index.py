#encoding=utf8

from starflyer import Handler
from camper.base import logged_in, is_main_admin

class IndexView(Handler):
    """an index handler"""

    template = "admin/index.html"

    @is_main_admin()
    def get(self):
        """render the view"""
        return self.render()
    post = get

