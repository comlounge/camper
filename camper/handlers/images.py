from camper import BaseHandler, logged_in, db, is_admin, ensure_barcamp
from starflyer import asjson
from werkzeug.utils import redirect
import werkzeug.exceptions

__all__ = ['AssetUploadView', 'AssetView']

class AssetUploadView(BaseHandler):
    """generic view for uploading asset. This view will simply take an asset upload,
    put it into the asset database and return the asset id via JSON. The format is::
        
        status: 'success',
        url: 'http://url to asset',
        asset_id: '......'

    In case or an error the following will be returned::

        status: 'error',
        msg: '....'

    The message will be translated into the selected locale already.

    In case you want to post process the asset, e.g. store it automatically
    inside a barcamp, page or user you can derive from this handler and add
    your own ``postprocess()`` method like this::

        @ensure_barcamp()
        def postprocess(self, asset, *args, **kwargs):   
            self.barcamp.logo = asset._id
            self.barcamp.save()

    if you return something else than ``None`` this will be used as the
    JSON response. Otherwise we assume the action was successful.

    """

    def postprocess(self, asset, *args, **kwargs):
        """override this function to do something with the asset"""
        return None
    
    @logged_in()
    @asjson(content_type="text/html")
    def post(self, *args, **kwargs):
        """upload a generic asset. You can use this handler for barcamps as well and
        pass in slugs but in order to actually store the asset you have to do that yourself
        or derive from this handler and add a ``postprocess()`` method as described above."""

        filename = self.request.headers.get('X-File-Name', "unknown")
        content_type = self.request.headers.get('X-Mime-Type', "application/octet-stream")

        # check IE
        if "qqfile" in self.request.files:
            # IE here
            f = self.request.files['qqfile']
            content_length = f.content_length
            stream = f.stream
        else:
            # rest here
            content_length = self.request.content_length
            stream = self.request.stream
        asset = self.app.module_map.uploader.add(
            stream, 
            filename = filename,
            content_type = content_type,
            content_length = content_length,
            )

        asset_id = unicode(asset._id)
        rv = self.postprocess(asset_id, *args, **kwargs)
        if rv is not None:
            return rv
        return {
            'url' : self.url_for("asset", asset_id = asset.variants['thumb']._id),
            'status' : "success",
            'asset_id' : asset_id
        }

class AssetView(BaseHandler):
    """handler for displaying an asset"""

    def get(self, asset_id = None):
        """return the asset"""
        try:
            asset = self.app.module_map.uploader.get(asset_id)
        except:
            raise werkzeug.exceptions.NotFound()
        response = self.app.response_class()
        response.headers['Content-Length'] = asset['content_length']
        response.headers['Content-Type'] = asset['content_type']
        response.response = asset.get_fp()
        return response

