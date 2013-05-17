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
        username = self.request.form.get("u", None)
        if username is not None:
            user = self.app.module_map.userbase.get_user_by_username(username)
        else:
            user = self.user

        # now check if we are allowed to to any changes to the user. We are if a) we are that user or b) we are an admin
        if not view.is_admin and not user==self.user:
            self.flash(self._("You are not allowed to change this."), category="danger")
            return redirect(self.url_for(".userlist", slug = self.barcamp.slug))
        if unicode(user._id) not in self.barcamp.subscribers:
            self.barcamp.subscribe(self.user) # we can only subscribe our own user, thus self.user and not user
            self.flash(self._("You are now on the list of people interested in the barcamp"), category="success")
        else:
            self.barcamp.unsubscribe(user) # we can remove any user if we have the permission (see above for the check)
            if user == self.user:
                self.flash(self._("You have been removed from the list of people interested in this barcamp"), category="danger")
            else:
                self.flash(self._("%(fullname)s has been removed from the list of people interested in this barcamp") %user, category="danger")
        return redirect(self.url_for(".userlist", slug = self.barcamp.slug))
        
class BarcampRegister(BarcampBaseHandler):
    """adds a user to the participants list if the list is not full, otherwise waiting list"""

    @ensure_barcamp()
    def post(self, slug = None):
        """only a post without parameters is done to add."""
        view = self.barcamp_view
        event = self.barcamp.event
        uid = unicode(self.user._id)

        if len(event.participants) >= self.barcamp.size:
            self.flash(self._("Unfortunately list of participants is already full. You have been put onto the waiting list and will be informed should you move on to the list of participants."), category="danger")
            if uid not in event.waiting_list:
                event.waiting_list.append(uid)
                self.barcamp.subscribers.remove(uid)
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
                if uid in self.barcamp.subscribers:
                    self.barcamp.subscribers.remove(uid)
                self.barcamp.put()
                self.mail_text("emails/welcome.txt", self._('Welcome to %s' %self.barcamp.name),
                    view = view,
                    barcamp = self.barcamp,
                    title = self.barcamp.name,
                    **self.barcamp)
        return redirect(self.url_for(".userlist", slug = self.barcamp.slug))

class BarcampUnregister(BarcampBaseHandler):
    """removes a user from the participants list and might move user up from the waiting list"""

    @ensure_barcamp()
    def post(self, slug = None):
        """only a post without parameters is done to remove."""
        event = self.barcamp.event
        view = self.barcamp_view

        # get the username from the form
        username = self.request.form.get("u", None)
        if username is not None:
            user = self.app.module_map.userbase.get_user_by_username(username)
        else:
            user = self.user
        uid = unicode(user._id)

        # now check if we are allowed to to any changes to the user. We are if a) we are that user or b) we are an admin
        if not view.is_admin and not user==self.user:
            self.flash(self._("You are not allowed to change this."), category="danger")
            return redirect(self.url_for(".userlist", slug = self.barcamp.slug))

        if uid in event.participants:
            event.participants.remove(uid)
        if len(event.participants) < self.barcamp.size and len(event.waiting_list)>0:
            # somebody from the waiting list can move up 
            nuid = event.waiting_list[0]
            event.waiting_list = event.waiting_list[1:]
            event.participants.append(nuid)

        # you are now still a subscriber 
        self.barcamp.subscribe(user)

        self.barcamp.put()
        if user == self.user:
            self.flash(self._("You have been removed from the list of participants."), category="danger")
        else:
            self.flash(self._("%(fullname)s has been removed from the list of participants.") %user, category="danger")
        return redirect(self.url_for(".userlist", slug = self.barcamp.slug))

