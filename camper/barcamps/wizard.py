from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
import werkzeug.exceptions

ALLOWED_CHECKS = [
    'has_event',
    'has_sponsor',
    'has_hashtag',
    'has_twitter',
    'has_facebook',
    'has_seo',
    'has_timetable',
    'has_logo'
]

class BarcampWizard(BarcampBaseHandler):
    """the wizard is a page which shows what needs eventually be done for a barcamp to make it complete"""

    template = "admin/wizard.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """show the missing pieces"""

        # check for post
        if self.request.method == "POST":
            for cancel in self.request.form:
                cancel = str(cancel)
                if cancel in ALLOWED_CHECKS and cancel not in self.barcamp.wizard_checked:
                    self.barcamp.wizard_checked.append(cancel)
            self.barcamp.save()

        # uses the computation in the base handler 
        return self.render(**self.compute_progress())

    post = get
