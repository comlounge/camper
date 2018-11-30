#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
from bson import ObjectId
import uuid

__all__ = ['DeleteView']

class EMailForm(BaseForm):
    """form for asking for email to confirm deletion"""
    email         = TextField(T(u"E-Mail address"), [validators.Length(max=200), validators.Email(), validators.Required()])


class DeleteView(BaseHandler):
    """let a user delete itself"""

    template = "users/delete_user.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = EMailForm(self.request.form, config = self.config, app = self.app, handler = self)

        if self.request.method=="POST":
            if form.validate():
                email = form.data['email']
                if email == self.user.email:

                    # delete user data
                    self.user.delete()
                    
                    # delete profile image
                    image_id = self.user.image
                    if image_id:
                        self.app.module_map.uploader.remove(image_id)

                    self.image              = None

                    self.user.save()
                    self.flash(self._("Your account was successfully deleted and you have been logged out."), category="info")

                    # logout user
                    self.app.module_map.userbase.logout(self)
                    url = self.url_for('index')
                    return redirect(url)
                else:
                    self.flash(self._("Your email was not correct"), category="danger")
            else:
                self.flash(self._("There have been errors in the form"), category="danger")
        return self.render(form = form, user = self.user)

    post = get
