from camper import BaseHandler, logged_in, db, is_admin, ensure_barcamp
from starflyer import asjson
from werkzeug.utils import redirect
import werkzeug.exceptions

#__all__ = ['ProfileImageUpload', 'ProfileImage']

class ProfileImageUploadOld(BaseHandler):
    """a view for uploading the user profile logo (display is separate because the URL
    might be served directly by the web server"""
    
    @logged_in()
    @asjson(content_type="text/html")
    def post(self, slug = None):
        """upload a file for a barcamp"""
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
        # store it in the user
        self.user.image = asset._id
        self.user.save()
        print {
            'preview' : self.url_for("asset", asset_id = asset.variants['thumb']._id),
            'success' : True,
        }
        return {
            'preview' : self.url_for("asset", asset_id = asset.variants['thumb']._id),
            'success' : True,
        }

class ProfileImage(BaseHandler):
    """return the profile image for the given user"""

    def get(self, username = None):
        """return the barcamp logo"""
        user = self.app.module_map.userbase.get_user_by_username(username)
        is_logged_in_user = False
        if self.user is not None:
            is_logged_in_user = self.user._id == user._id

        asset_id = user.logo
        asset = self.app.module_map.uploader.get(asset_id)
        if asset is None:
            raise werkzeug.exceptions.NotFound()
        response = self.app.response_class()
        response.headers['Content-Length'] = asset['content_length']
        response.headers['Content-Type'] = asset['content_type']
        response.response = asset.get_fp()
        return response

