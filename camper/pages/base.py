from sfext.uploader import AssetNotFound
from wtforms.widgets import html_params

class PageView(object):
    """wrapper around a pages to provide additional features"""

    def __init__(self, page, handler):
        """initialize the wrapper with the page and the handler it is used with"""

        self.page = page
        self.handler = handler
        self.app = self.handler.app
        self.config = self.handler.app.config
        self.user = self.handler.user

    @property
    def image_url(self):
        """return the URL of the title image based on a variant. You can use it as::

            url = page.image_url.userlist 

        Returns None if no image is available
        """
        uf = self.app.url_for
        try:
            asset = self.app.module_map.uploader.get(self.page.image)
        except AssetNotFound:
            return None
        except Exception, e:
            return None
        return dict(
                [(vid, uf('asset', asset_id = asset._id)) for vid, asset in asset.variants.items()]
        )
    

    def title_image(self, **kwargs):
        """return the title image tag"""
        try:
            asset = self.app.module_map.uploader.get(self.page.image)
        except AssetNotFound:
            asset = None
        if not asset:
            return u""
        v = asset.variants['fullwidth']
        url = self.app.url_for("asset", asset_id = v._id)
        amap = html_params(**kwargs)
        return """<img src="%s" width="%s" height="%s" %s>""" %(
            url,
            v.metadata['width'],
            v.metadata['height'],
            amap)
