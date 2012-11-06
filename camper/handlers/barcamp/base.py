
class BarcampView(object):
    """wrapper around the barcamp to provide view functions"""

    def __init__(self, barcamp, handler):
        """initialize the adapter with the barcamp and the handler in use"""
        self.barcamp = barcamp
        self.handler = handler

    @property
    def logo(self):
        """show the logo tag"""
        return """<a href="%s"><img src="%s" nwidth="600"></a>""" %(
            self.handler.url_for("barcamp", slug = self.barcamp.slug), 
            self.handler.url_for("barcamp_logo", slug = self.barcamp.slug))

    @property
    def sponsors(self):
        res = []
        i = 0 
        for sponsor in self.barcamp.sponsors:
            tag = """<a href="%s"><img src="%s"></a>""" %(
                sponsor['url'],
                self.handler.url_for("asset", asset_id = sponsor['logo']))
            res.append(
                {'url'  : sponsor['url'],
                 'name'  : sponsor['name'],
                 'idx'  : i,
                 'image'  : tag
                })
            i=i+1
        return res
