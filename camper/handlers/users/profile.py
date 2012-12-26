#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions

class ProfileView(BaseHandler):
    """shows the profile of a user"""

    template = "users/profile.html"

    def get(self, username = None):
        """render the view"""
        user = self.app.module_map.userbase.get_user_by_username(username)
        is_logged_in_user = False
        if self.user is not None:
            is_logged_in_user = self.user._id == user._id
        if user is None:
            raise werkzeug.exceptions.NotFound()
        return self.render(
            user = user, 
            is_logged_in_user = is_logged_in_user
            )

