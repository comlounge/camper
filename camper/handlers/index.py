#encoding=utf8

from camper import BaseHandler
from barcamp.base import BarcampView

class IndexView(BaseHandler):
    """an index handler"""

    template = "index.html"

    def get(self):
        """render the view"""
        barcamps = self.config.dbs.barcamps.find()
        barcamps = [BarcampView(barcamp, self) for barcamp in barcamps]
        return self.render( barcamps = barcamps )
    post = get

class Impressum(BaseHandler):
    """show the impressum"""

    template = "impressum.html"

    def get(self):
        """render the view"""
        return self.render()

