#encoding=utf8

from starflyer import Handler

class IndexView(Handler):
    """an index handler"""

    template = "index.html"

    def get(self):
        """render the view"""
        barcamps = self.config.dbs.barcamps.find()
        return self.render(barcamps = barcamps)
    post = get
