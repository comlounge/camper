#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import datetime
from .base import BarcampBaseHandler

class View(BarcampBaseHandler):
    """shows the main page of a barcamp"""

    template = "index.html"
    action = "home"


    def get(self, slug = None):
        """render the view"""
        if not self.barcamp:
            raise werkzeug.exceptions.NotFound()

        event = self.barcamp.live_event # the active event or None
        now = datetime.datetime.now().strftime("%H:%M")


        params = {
            'barcamp' : self.barcamp,
            'title' : self.barcamp.name,
            'event' : event,
        }
        if event:
            params['rooms'] = event.rooms
            params['timeslots'] = event.timeslots
            params['sessionplan'] = event.timetable.get('sessions', {})
            params['active_event'] = event

            # compute active timeslot
            i = 0
            active_slot = None
            for slot in event.timeslots:
                if now > slot['time'] and i == len(event.timeslots)-1:
                    active_slot = slot['time']
                    break
                if now > slot['time'] and now < event.timeslots[i+1]['time']:
                    active_slot = slot['time']
                    break
                i = i + 1

            params['active_slot'] = active_slot 
        params.update(self.barcamp)

        return self.render(**params)
            
class RedirectView(BarcampBaseHandler):
    """redirect to version with trailing /"""

    def get(self, slug = None):
        return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug), code=301)


class BarcampSponsors(BarcampBaseHandler):
    """view for adding and deleting sponsors"""

    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """just add the sponsor and reload the page"""
        form = SponsorForm(self.request.form, config = self.config)
        if form.validate():
            f = form.data
            f['logo'] = f['image']
            del f['image']
            self.barcamp.sponsors.append(f)
            self.barcamp.put()
            self.flash("Neuen Sponsor angelegt", category="info")
        else:
            self.flash("Leider enthielt das Formular einen Fehler", category="error")
        return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))

    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))




