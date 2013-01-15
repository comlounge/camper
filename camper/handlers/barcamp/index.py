#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
from base import BarcampView
import werkzeug.exceptions

class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")


class View(BaseHandler):
    """shows the main page of a barcamp"""

    template = "barcamp/index.html"

    def get(self, slug = None):
        """render the view"""
        sponsor_form = SponsorForm(self.request.form, config = self.config)
        if not self.barcamp:
            raise werkzeug.exceptions.NotFound()
        return self.render(
            view = BarcampView(self.barcamp, self), 
            barcamp = self.barcamp,
            title = self.barcamp.name,
            sponsor_form = sponsor_form,
            **self.barcamp)


class BarcampSubscribe(BaseHandler):
    """adds a user to the subscription list"""

    def post(self, slug = None):
        """only a post without parameters is done to add. Post again to unsubscribe"""
        view = BarcampView(self.barcamp, self)
        if not view.is_subscriber:
            self.barcamp.subscribe(self.user)
            self.flash(self._("You are now on the list of people interested in the barcamp"), category="success")
        else:
            self.barcamp.unsubscribe(self.user)
            self.flash(self._("You have been removed from the list of people interested in this barcamp"), category="danger")
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
        
class BarcampRegister(BaseHandler):
    """adds a user to the participants list if the list is not full, otherwise waiting list"""

    def post(self, slug = None):
        """only a post without parameters is done to add."""
        view = BarcampView(self.barcamp, self)
        event = self.barcamp.event
        uid = unicode(self.user._id)

        # we are a subscriber in any case now
        self.barcamp.subscribe(self.user)

        if len(event.participants) >= self.barcamp.size:
            self.flash(self._("Unfortunately list of participants is already full. You have been put onto the waiting list and will be informed should you move on to the list of participants."), category="danger")
            if uid not in event.waiting_list:
                event.waiting_list.append(uid)
                self.barcamp.put()
        else:
            self.flash(self._("You are now on the list of participants for this barcamp."), category="success")
            if uid not in event.participants:
                event.participants.append(uid)
                self.barcamp.put()
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))

class BarcampUnregister(BaseHandler):
    """removes a user from the participants list and might move user up from the waiting list"""

    def post(self, slug = None):
        """only a post without parameters is done to remove."""
        view = BarcampView(self.barcamp, self)
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

class BarcampSponsors(BaseHandler):
    """view for adding and deleting sponsors"""

    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """just add the sponsor and reload the page"""
        form = SponsorForm(self.request.form, config = self.config)
        if form.validate():
            f = form.data
            f['logo'] = f['image']['id']
            del f['image']
            self.barcamp.sponsors.append(f)
            self.barcamp.put()
            self.flash("Neuen Sponsor angelegt", category="info")
        else:
            self.flash("Leider enthielt das Formular einen Fehler", category="error")
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))

    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        post = self.barcamp.blogposts[idx]
        if self.user_id != post.user_id and not self.is_admin:
            return {'status' : 'error', 'msg' : self._('User not allowed to delete this item')}
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamp", slug = self.barcamp.slug))




