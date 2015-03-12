from sfext.uploader import AssetNotFound

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
