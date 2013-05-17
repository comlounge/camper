#encoding=utf8

from starflyer import Handler, redirect
from camper import BaseForm, db, logged_in, string2filename, BaseHandler, is_admin, ensure_page
from camper.barcamps.base import BarcampBaseHandler
from wtforms import *

__all__ = ['View']

class View(BarcampBaseHandler):
    """render a page"""

    template = "pages/view.html"

    @property
    def action(self):
        """return the active action based on page id"""
        return "page_%s" %self.page._id
    
    @ensure_page()
    def get(self, slug = None, page_slug = None):
        """render the view"""
        page = self.config.dbs.pages.by_slug(page_slug, barcamp = self.barcamp)
        # TODO: refactor this somehow so it's more independent of the barcamp stuff, maybe incorporate barcamp id into 
        # the page name? Maybe intro some new unique page id which is composed like that?
        if self.barcamp is None:
            if page.image is not None:
                image = """<img src="%s">""" %(
                    self.url_for("page_image", slug = "___", page_slug = page_slug))
            else:
                image = None
            return self.render(
                master = "master.html",
                page = page,
                slug = "___",
                page_slug = page_slug,
                image = image)
        else:
            if page.image is not None:
                image = """<img src="%s">""" %(
                    self.url_for("page_image", slug = self.barcamp.slug, page_slug = page_slug))
            else:
                image = None
            return self.render(
                master = "barcamp/master.html",
                page = page,
                page_slug = page_slug,
                image = image,
                title = self.barcamp.name,
                **self.barcamp)


