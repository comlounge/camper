#encoding=utf8
import random
import werkzeug
import datetime
from werkzeug.utils import redirect
from starflyer import asjson

from camper import BaseHandler, logged_in, db, aspdf

class Uploader(BaseHandler):
    """a view for creating a new transaction"""

    @logged_in()
    @asjson(content_type="text/html")
    def post(self, client_id = None, transaction_id = None):
        """upload a file for a fileset"""
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
        asset = self.app.module_map.uploader.add(stream, filename = filename)
        record = {
            'content_length' : asset.content_length,
            'content_type' : content_type,
            'filename' : filename,
            'asset_id' : asset._id
        }
        self.transaction.d.attachments.append(record)
        self.transaction.save()
        html = self.render("includes/file-item.html", attachment = record)
        record['success'] = True
        record['html'] = html
        return record


class Downloader(BaseHandler):
    """download a file"""

    @logged_in()
    def get(self, client_id = None, transaction_id = None, asset_id = None):
        """return the file given that you have the permission to do that"""
        for a in self.transaction.d.attachments:
            if a['asset_id'] == asset_id:
                asset = self.app.module_map.uploader.get(asset_id)
                filename = a['filename']
                content_length = a['content_length']
                content_type = a['content_type']
                response = self.app.response_class()
                #response.headers['Content-Disposition']="attachment; filename=\"%s\"" %filename
                response.headers['Content-Length'] = content_length
                response.headers['Content-Type'] = content_type
                response.response = asset.get_fp()
                return response

        raise werkzeug.exceptions.NotFound()

    
class FileDeleteHandler(BaseHandler):
    """deletes a file"""

    @logged_in()
    def delete(self, client_id = None, transaction_id = None, asset_id = None):
        """return the file given that you have the permission to do that"""
        for a in self.transaction.d.attachments:
            if a['asset_id'] == asset_id:
                asset = self.app.module_map.uploader.remove(asset_id)
                self.transaction.d.attachments.remove(a)
                self.transaction.save()
                self.flash(self._(u"file '%s' has been deleted") %a['filename'])
                return redirect(self.url_for("transaction", client_id=client_id, transaction_id = transaction_id))
        raise werkzeug.exceptions.NotFound()

    
