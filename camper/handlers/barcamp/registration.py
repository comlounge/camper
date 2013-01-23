from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions

class BarcampSubscribe(BarcampBaseHandler):
    """adds a user to the subscription list"""

    @ensure_barcamp()
    def post(self, slug = None):
        """only a post without parameters is done to add. Post again to unsubscribe"""
        view = self.barcamp_view
        if not view.is_subscriber:
            self.barcamp.subscribe(self.user)
            self.flash(self._("You are now on the list of people interested in the barcamp"), category="success")
        else:
            self.barcamp.unsubscribe(self.user)
            self.flash(self._("You have been removed from the list of people interested in this barcamp"), category="danger")
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
        
class BarcampRegister(BarcampBaseHandler):
    """adds a user to the participants list if the list is not full, otherwise waiting list"""

    @ensure_barcamp()
    def post(self, slug = None):
        """only a post without parameters is done to add."""
        view = self.barcamp_view
        event = self.barcamp.event
        uid = unicode(self.user._id)

        # we are a subscriber in any case now
        self.barcamp.subscribe(self.user)

        if len(event.participants) >= self.barcamp.size:
            self.flash(self._("Unfortunately list of participants is already full. You have been put onto the waiting list and will be informed should you move on to the list of participants."), category="danger")
            if uid not in event.waiting_list:
                event.waiting_list.append(uid)
                self.barcamp.put()
                self.mail_text("emails/welcome.txt", self._('You are now on the waiting list for %s' %self.barcamp.name),
                    view = view,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    **self.barcamp)
        else:
            self.flash(self._("You are now on the list of participants for this barcamp."), category="success")
            if uid not in event.participants:
                event.participants.append(uid)
                self.barcamp.put()
                self.mail_text("emails/welcome.txt", self._('Welcome to %s' %self.barcamp.name),
                    view = view,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    **self.barcamp)
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))

class BarcampUnregister(BarcampBaseHandler):
    """removes a user from the participants list and might move user up from the waiting list"""

    @ensure_barcamp()
    def post(self, slug = None):
        """only a post without parameters is done to remove."""
        event = self.barcamp.event
        uid = unicode(self.user._id)
        if uid in event.participants:
            event.participants.remove(uid)
        if len(event.participants) < self.barcamp.size and len(event.waiting_list)>0:
            # somebody from the waiting list can move up 
            nuid = event.waiting_list[0]
            event.waiting_list = event.waiting_list[1:]
            event.participants.append(nuid)
        self.barcamp.put()
        self.flash(self._("You have been removed from the list of participants."), category="danger")
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))

