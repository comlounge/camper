#encoding=utf8

from starflyer import Handler
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin, is_main_admin

class PagesView(Handler):
    """an handler for managing pages"""

    template = "admin/pages.html"

    @is_main_admin()
    def get(self):
        """render the view"""
        pages_for_menu = self.config.dbs.pages.for_slot("menu")
        pages_for_footer = self.config.dbs.pages.for_slot("footer")
        return self.render(
            pages_for_menu = pages_for_menu,
            pages_for_footer = pages_for_footer,
        )
    post = get

