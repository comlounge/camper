from camper import BaseHandler, logged_in, db
from starflyer import asjson
from werkzeug.utils import redirect
import werkzeug.exceptions

class LogoUpload(BaseHandler):
    """a view for uploading the barcamp logo (display is separate because the URL
    might be served directly by the web server"""
    
    # TODO: should only be allowed for admins of the barcamp
    @asjson(content_type="text/html")
    def post(self, slug = None):
        """upload a file for a barcamp"""
        filename = self.request.headers.get('X-File-Name', "unbekannt")
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
        # store it in the barcamp
        self.barcamp.logo = asset._id
        self.barcamp.put()
        return {
            'success' : True,
            'redirect' : self.url_for("barcamp", slug = slug),
        }

class Logo(BaseHandler):
    """return the logo"""

    def get(self, slug = None):
        """return the barcamp logo"""
        asset_id = self.barcamp.logo
        asset = self.app.module_map.uploader.get(asset_id)
        if asset is None:
            raise werkzeug.exceptions.NotFound()
        response = self.app.response_class()
        response.headers['Content-Length'] = asset['content_length']
        response.headers['Content-Type'] = asset['content_type']
        response.response = asset.get_fp()
        return response

class LogoDelete(BaseHandler):
    """delete the logo"""

    def delete(self, slug = None):
        """delete barcamp logo"""
        asset_id = self.barcamp.logo
        self.app.module_map.uploader.remove(asset_id)
        self.barcamp.logo = None
        self.barcamp.put()
        return redirect(self.url_for("barcamp", slug = slug))

