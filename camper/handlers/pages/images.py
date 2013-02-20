from camper import BaseHandler, logged_in, db, is_admin, ensure_barcamp
from starflyer import asjson
from werkzeug.utils import redirect
import werkzeug.exceptions

class ImageUpload(BaseHandler):
    """a view for uploading a page image (display is separate because the URL
    might be served directly by the web server"""

    template = "pages/image.html"

    def get(self, slug = None, page_slug = None):
        """return the contents for the image upload view"""
        if self.barcamp is None:
            return self.render(
                page = self.page,
                slug = "___",
                page_slug = page_slug)
        else:
            return self.render(
                page = self.page,
                page_slug = page_slug,
                **self.barcamp)
    
    @logged_in()
    @is_admin()
    @asjson(content_type="text/html")
    def post(self, slug = None, page_slug = None):
        """upload an image for a page"""
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

        # store it in the page
        self.page.image = asset._id
        self.page.put()
        if self.barcamp is None:
            return {
                'status' : "success",
                'parent_redirect' : self.url_for("page", page_slug = page_slug),
            }
        else:
            return {
                'status' : "success",
                'parent_redirect' : self.url_for("barcamp_page", slug = slug, page_slug = page_slug),
            }

class Image(BaseHandler):
    """return an image"""
    def get(self, slug = None, page_slug = None):
        """return the barcamp logo"""
        asset_id = self.page.image
        asset = self.app.module_map.uploader.get(asset_id)
        if asset is None:
            raise werkzeug.exceptions.NotFound()
        response = self.app.response_class()
        response.headers['Content-Length'] = asset['content_length']
        response.headers['Content-Type'] = asset['content_type']
        response.response = asset.get_fp()
        return response

class ImageDelete(BaseHandler):
    """delete an image """

    @logged_in()
    @is_admin()
    def delete(self, slug = None, page_slug = None):
        """delete barcamp logo"""
        asset_id = self.page.image
        self.app.module_map.uploader.remove(asset_id)
        self.page.image = None
        self.page.put()
        if self.barcamp is None:
            return redirect(self.url_for("page", page_slug = page_slug))
        else:
            return redirect(self.url_for("barcamp_page", slug = slug, page_slug = page_slug))
