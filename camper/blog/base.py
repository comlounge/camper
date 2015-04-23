from sfext.uploader import AssetNotFound
from wtforms.widgets import html_params
import bson

class EntryView(object):
    """wrapper around a blog entry to provide additional features"""

    def __init__(self, entry, handler):
        """initialize the wrapper with the entry and the handler it is used with"""

        self.entry = entry
        self.handler = handler
        self.app = self.handler.app
        self.config = self.handler.app.config
        self.user = self.handler.user

    @property
    def image_url(self):
        """return the URL of the title image based on a variant. You can use it as::

            url = entry.image_url.userlist 

        Returns None if no image is available
        """
        uf = self.app.url_for
        try:
            asset = self.app.module_map.uploader.get(self.entry.image)
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
            asset = self.app.module_map.uploader.get(self.entry.image)
        except AssetNotFound:
            asset = None
        if not asset:
            return u""
        v = asset.variants['medium_user']
        url = self.app.url_for("asset", asset_id = v._id)
        amap = html_params(**kwargs)
        return """<img src="%s" width="%s" height="%s" %s>""" %(
            url,
            v.metadata['width'],
            v.metadata['height'],
            amap)

    @property
    def has_gallery(self):
        """return whether this barcamp features a gallery"""
        return self.entry.gallery is not None


    @property
    def gallery(self):
        """return the gallery"""
        gallery = self.config.dbs.galleries.get(bson.ObjectId(self.entry.gallery))
        return gallery

