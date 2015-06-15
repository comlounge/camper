#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
from bson import ObjectId

from camper.handlers.images import AssetUploadView

class ProfileImageAssetUploadView(AssetUploadView):
    """custom upload handler for different version"""

    variant = "medium_user"

TSHIRT_CHOICES = (
    ('s' , 'S'),
    ('m' , 'M'),
    ('l' , 'L'),
    ('xl' , 'XL'),
    ('xxl' , 'XXL'),
)

class EditForm(BaseForm):
    """form for adding a barcamp"""
    user_id       = HiddenField()
    fullname      = TextField(T(u"Fullname"))
    username      = TextField(T(u"url name (username)"), [validators.Length(min=4, max=50), validators.Required(), validators.Regexp('^[a-zA-Z0-9_]+$')], description=T("this is the url path of your profile page, should only contain letters and numbers"))
    bio           = TextAreaField(T(u"About me"))
    organisation  = TextField(T(u"Organisation"), [validators.Length(max=100)], description = T("your school, company, institution (max. 100 characters)"))
    twitter       = TextField(T(u"Twitter"), [validators.Length(max=100)], description = T("your twitter username"))
    facebook      = TextField(T(u"Facebook"), [validators.Length(max=255)], description = T("path to your facebook profile (without domain)"))
    tshirt        = SelectField(T(u"T shirt size"), choices = TSHIRT_CHOICES)
    image         = UploadField(T(u"Profile Image (optional)"))

    # TODO: maybe change email, too?
    def validate_email(form, field):
        if form.app.module_map.userbase.users.find({'email' : field.data}).count() > 0:
            raise ValidationError(T('this email address is already taken'))

    def validate_username(form, field):
        if form.app.module_map.userbase.users.find({'username' : field.data, '_id' : {'$ne': ObjectId(form.data['user_id'])}}).count() > 0:
            raise ValidationError(T('this url path is already taken'))


class ProfileEditView(BaseHandler):
    """shows the profile edit form"""

    template = "users/edit.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = EditForm(self.request.form, obj = self.user, config = self.config, app = self.app)
        if self.user.image:
            try:
                asset = self.app.module_map.uploader.get(self.user.image)
                image = self.url_for("asset", asset_id = asset.variants['medium_user']._id)
            except:
                image = None
        else:
            image = None
        if self.request.method=="POST":
            if form.validate():
                self.user.update(form.data)
                self.user.save()
                self.flash(self._("Your profile has been updated"), category="info")
                url = self.url_for("profile", username = self.user.username)
                return redirect(url)
            else:
                self.flash(self._("There have been errors in the form"), category="danger")
        return self.render(form = form, user = self.user, image = image)

    post = get

class ProfileImageDeleteView(BaseHandler):
    """delete the profile image"""

   
    @asjson()
    def json(self, d):
        return d

    @logged_in()
    def delete(self):
        """delete the profile image and return to the profile page"""
        asset_id = self.user.image
        if asset_id is not None:
            asset = self.app.module_map.uploader.remove(asset_id)
            self.user.image = None
            self.user.save()
            self.flash(self._("Your profile image has been deleted"), category="info")
        fmt = self.request.form.get("fmt", "html")
        if fmt=="html":
            url = self.url_for("profile", username = self.user.username)
            return redirect(url)
        else:
            return self.json({"status": "ok"})
