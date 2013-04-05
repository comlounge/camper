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
        asset_id = user.image
        if asset_id is not None:
            try:
                asset = self.app.module_map.uploader.get(asset_id)
                image = self.url_for("asset", asset_id = asset.variants['medium_user']._id)
            except:
                image = None
        else:
            image = None
        return self.render(
            profile_user = user, 
            is_logged_in_user = is_logged_in_user,
            image = image
        )

