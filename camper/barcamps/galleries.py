#encoding=utf8
from starflyer import Handler, redirect, asjson
import starflyer
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in
import bson
from wtforms import *
from camper.handlers.forms import *
from .base import BarcampBaseHandler, is_admin
import werkzeug.exceptions
import datetime
from base import GalleryView
from sfext.babel import T
from camper.db.galleries import Image
import os, copy


class ImageGalleryForm(BaseForm):
    """basic form to create a new gallery"""
    title = TextField([validators.Length(80)])

class ImageForm(BaseForm):
    """form for adding a new image to an image gallery"""
    image       = UploadField(T(u"New Image"), autosubmit = True)

class ImageDetailForm(BaseForm):
    """form for image details"""

    _id         = HiddenField()
    title       = TextField(T("Title"))
    alt         = TextField(T("Alt attribute"))
    description = TextAreaField(T("Description"))
    license     = TextField(T("License"))
    copyright   = TextField(T("Copyright Owner"))


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
        form = ImageGalleryForm(self.request.form)
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

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    @asjson()
    def delete(self, slug = None):
        """delete a gallery"""
        _id = self.request.form['entry']
        gallery = self.config.dbs.galleries.get(bson.ObjectId(_id))
        gallery.remove()
        return {'status' : 'success', 'reload' : True}

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
        detail_form = ImageDetailForm
        gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))
        view = GalleryView(gallery, self)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            if f.get("image","") != "":
                image = Image(image = f['image'])
                gallery.add_image(image)
                gallery.save()
            return redirect(self.request.url)

        return self.render(gallery= gallery, form = form, view = view, detail_form = detail_form)

    post = get

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    @asjson()
    def delete(self, slug = None, gid = None):
        """delete an image from the gallery"""
        _id = self.request.form['entry']
        gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))
        image = gallery.get_image(_id)
        if image:
            gallery.delete_image(_id)
            gallery.save()
            return {'status' : 'success', 'id' : "block-"+_id}
        else:
            return {'status' : 'error', 'msg' : self._('The image could not be found')}
        return {}



class GalleryTitleEdit(BarcampBaseHandler):
    """handler for editing the gallery title"""

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    @asjson()
    def post(self, slug = None, gid = None):
        """update the gallery"""
        gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))
        form = ImageGalleryForm(self.request.form)
        if form.validate():
            gallery.update(form.data)
            gallery.save()
            return {'title': gallery.title, 'status': 'success'}
        return {'status' : 'error', 'msg': 'form did not validate'}



class GalleryImageEdit(BarcampBaseHandler):
    """edit one image. we use the barcamp handler in order to make sure the user
    is actually the admin of that barcamp"""

    template = "admin/gallery_macros.html"

    @ensure_barcamp()
    @is_admin()
    @logged_in()
    @asjson()
    def post(self, slug = None, gid = None):
        """update an image"""
        _id = self.request.form['_id']
        gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))
        image = gallery.get_image(_id)
        detail_form = ImageDetailForm(self.request.form, prefix="image-%s" %_id)
        if detail_form.validate():
            image.update(detail_form.data)
            gallery.update_image(image)
            gallery.save()
            gallery = self.config.dbs.galleries.get(bson.ObjectId(gid))

        # now render it again using the macro from the template

        # add the image tag to the image 
        # TODO: make this better so we don't have to repeat it from the view. 
        # problem is again context
        asset = self.app.module_map.uploader.get(image.image)
        v = asset.variants['medium_user']
        url = self.app.url_for("asset", asset_id = v._id)
        new_image = copy.copy(image)
        new_image.tag = """<img src="%s" width="%s" height="%s">""" %(
            url,
            v.metadata['width'],
            v.metadata['height'])

        # now render just the macro (that's why we pass render=True)
        html = self.render(image = new_image, gallery = gallery, detail_form = ImageDetailForm, render = True)
        return {'status': 'success', 'html' : html}







