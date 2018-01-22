#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
from bson import ObjectId

__all__ = ['EMailEditView']


class EMailForm(BaseForm):
    """form for adding a barcamp"""
    user_id       = HiddenField()
    email         = TextField(T(u"E-Mail address"), [validators.Length(max=200), validators.Email(), validators.Required()])
    
    def validate_email(form, field):
        if form.app.module_map.userbase.users.find({'email' : field.data, '_id' : {'$ne': ObjectId(form.data['user_id'])}}).count() > 0:
            raise ValidationError(form.handler._('this email address is already taken'))

    def validate_username(form, field):
        if form.app.module_map.userbase.users.find({'username' : field.data, '_id' : {'$ne': ObjectId(form.data['user_id'])}}).count() > 0:
            raise ValidationError(form.handler._('this url path is already taken'))


class EMailEditView(BaseHandler):
    """shows the email edit form"""

    template = "users/change_email.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = EMailForm(self.request.form, obj = self.user, config = self.config, app = self.app, handler = self)
        if self.request.method=="POST":
            if form.validate():
                email = form.data['email']
                # now save it temporarily and send an activation email
                code = self.user.set_new_email(email)
                print "got email, sending activation email", email, code
                activation_url = code
                self.mail_text("emails/nl_set_reply_to.txt", self._('Confirm your Reply-To address'), send_to = email, activation_url = activation_url)
                self.user.save()
                self.flash(self._("Please check your inbox of the new email for a confirmation mail and confirm it"), category="info")
                url = self.url_for("profile", username = self.user.username)
                return redirect(url)
            else:
                self.flash(self._("There have been errors in the form"), category="danger")
        return self.render(form = form, user = self.user)

    post = get
