#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in
import bson
from wtforms import *
from camper.handlers.forms import *
from .base import BarcampBaseHandler, is_admin
import werkzeug.exceptions
import datetime
from base import GalleryView
from sfext.babel import T


class ImageGalleryAddForm(BaseForm):
    """basic form to create a new gallery"""
    title = TextField()

class ImageForm(BaseForm):
    """form for adding a new image to an image gallery"""
    image       = UploadField(T(u"New Image"))

class GalleryList(BarcampBaseHandler):
    """shows a list of all the galleries"""

    template = "admin/galleries.html"
    action = "galleries"

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    def get(self, slug = None):
        """return the list of galleries"""
        barcamp_id = self.barcamp._id
        galleries = [GalleryView(g, self) for g in self.config.dbs.galleries.by_barcamp(self.barcamp)]
        form = ImageGalleryAddForm(self.request.form)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            gallery = db.ImageGallery(f)
            gallery.created_by = self.user_id
            gallery = self.config.dbs.galleries.add(gallery, barcamp = self.barcamp)
            self.flash(self._('A new image gallery has been created'))
            gallery_url = self.url_for("barcamps.admin_gallery", slug = slug, gid = gallery._id)
            return redirect(gallery_url)
        return self.render(galleries = galleries, form = form, view = self.barcamp_view, **self.barcamp)

    # TODO: Post should only work logged in!
    post = get

class GalleryAdminEdit(BarcampBaseHandler):
    """edit an image gallery"""

    template = "admin/galleryadmin.html"
    action = "galleries"

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    def get(self, slug = None, gid = None):
        """show the gallery and let the admin edit it"""
        form = ImageForm(self.request.form)
        gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))
        view = GalleryView(gallery, self)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            if f.get("image","") != "":
                gallery.images.append(f['image'])
                gallery.save()
            return redirect(self.request.url)

        return self.render(gallery= gallery, form = form, view = view)

    post = get 
