from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
import werkzeug.exceptions
import hashlib

class SessionPad(BarcampBaseHandler):
    """show the documentation for a session"""

    template = 'sessionpad.html'

    @ensure_barcamp()
    def get(self, slug = None, eid = None, session_slug = None):
        """show the session documentation or create it if it does not exist"""

        event = self.barcamp.get_event(eid)
        sessionplan = event.timetable.get('sessions', {})
        found = False
        for session in sessionplan.values():
            if session.get('slug','') == session_slug:
                found = True
                break
        if not found:
            raise werkzeug.exceptions.NotFound()

        # create the etherpad
        pid = slug+"_"+session_slug

        # check if the pad name is too long and hash it in this case
        if len(pid) > 50:
            pid = hashlib.sha1(pid).hexdigest()[:50]

        if not self.config.testing:
            try:
                self.config.etherpad.createPad(padID=pid, text=u"Planung")
            except Exception, e:
                print "error creating session pad for Planung", pid
                pass # guess it exists already
        session['pad'] = pid
        self.barcamp.events[eid] = event
        self.barcamp.save()

        if self.logged_in:
            fav_sessions = self.app.config.dbs.userfavs.get_favs_for_bc(str(self.barcamp._id), self.user_id, eid)
        else:
            fav_sessions = []

        try:
            a= self.render(
                session = session,
                event = event,
                pad = pid,
                view = self.barcamp_view,
                barcamp = self.barcamp,
                fav_sessions = fav_sessions,
                **self.barcamp)
        except Exception, e:
            print e
        return self.render(
            session = session,
            event = event,
            pad = pid,
            view = self.barcamp_view,
            barcamp = self.barcamp,
            fav_sessions = fav_sessions,
            **self.barcamp)
