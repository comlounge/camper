
class BarcampView(object):
    """wrapper around the barcamp to provide view functions"""

    def __init__(self, barcamp, handler):
        """initialize the adapter with the barcamp and the handler in use"""
        self.barcamp = barcamp
        self.handler = handler
        self.app = self.handler.app
        self.config = self.handler.app.config
        self.user = self.handler.user

    @property
    def logo(self):
        """show the logo tag"""
        return """<a href="%s"><img src="%s" nwidth="600"></a>""" %(
            self.handler.url_for("barcamp", slug = self.barcamp.slug), 
            self.handler.url_for("barcamp_logo", slug = self.barcamp.slug))

    @property
    def is_admin(self):
        """true if the logged in user is a barcamp admin"""
        if self.user is None:
            return False
        if unicode(self.user._id) in self.barcamp.admins:
            return True
        if self.user.is_admin:
            return True
        return False

    @property
    def can_add_menu_page(self):
        """this is True if the user is an admin and there are less than 3 pages for the menu slot"""
        if not self.is_admin:
            return False
        return self.config.dbs.pages.for_slot("menu", barcamp=self.barcamp).count() < 3

    def pages_for(self, slot):
        """return all the pages for a given slot and barcamp"""
        return self.config.dbs.pages.for_slot("menu", barcamp=self.barcamp)

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
