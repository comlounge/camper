from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
import werkzeug.exceptions

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
        if not self.config.testing:
            try:
                self.config.etherpad.createPad(padID=pid, text=u"Planung")
            except Exception, e:
                print "error", e
                pass # guess it exists already
        session['pad'] = pid
        self.barcamp.events[eid] = event
        self.barcamp.save()

        return self.render(
            session = session,
            pad = pid,
            view = self.barcamp_view,
            barcamp = self.barcamp,
            **self.barcamp)
