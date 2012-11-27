#encoding=utf8

from starflyer import Handler, redirect
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin
from camper.handlers.barcamp.base import BarcampView
from wtforms import *

__all__ = ['View']

class View(BaseHandler):
    """render a page"""

    template = "pages/view.html"

    def get(self, slug = None, page_slug = None):
        """render the view"""
        page = self.config.dbs.pages.by_slug(page_slug, barcamp = self.barcamp)
        if page.image is not None:
            image = """<img src="%s">""" %(
                self.url_for("page_image", slug = self.barcamp.slug, page_slug = page_slug))
        else:
            image = None
        return self.render(
            page = page,
            page_slug = page_slug,
            image = image,
            view = BarcampView(self.barcamp, self), 
            title = self.barcamp.name,
            **self.barcamp)


