#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db
from wtforms import *

class View(Handler):
    """shows the main page of a barcamp"""

    template = "barcamp/index.html"

    def get(self, slug = None):
        """render the view"""
        barcamp = self.config.dbs.barcamps.find_one({'slug' : slug})
        return self.render(**barcamp)
