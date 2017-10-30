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


        bc = self.barcamp
        wc = bc.wizard_checked # stuff the admin does not want
        events = bc.eventlist

        # do we have rooms and times for at least 1 event?
        # also gather all the events which do not have rooms or times

        event_status = {}
        has_timetable = False
        for event in events:
            event_status[event._id] = {
                'rooms' : False,
                'timeslots' : False,
            }
            
            tt = event.get('timetable', {})
            rooms = tt.get('rooms', [])
            timeslots = tt.get('timeslots', [])

            if len(rooms) > 0:
                has_timetable = True
                event_status[event._id]['rooms'] = True

            if len(timeslots) > 0:
                has_timetable = True
                event_status[event._id]['timeslots'] = True

        has_event = len(events) != 0 or "has_event" in wc
        has_sponsor = len(bc.sponsors) != 0 or "has_sponsor" in wc
        has_logo = bc.logo != "" and bc.logo != None or "has_logo" in wc
        has_twitter = bc.twitter or "has_twitter" in wc
        has_hashtag = bc.hashtag or "has_hashtag" in wc
        has_facebook = bc.facebook or "has_facebook" in wc
        has_seo = bc.seo_description or "has_seo" in wc

        is_public = bc.workflow in ("public", "registration")
        is_active = bc.workflow == "registration"
        has_timetable = has_timetable or "has_timetable" in wc

        # get tickets in case of ticketmode
        ticket_classes = self.barcamp.ticketlist
        tickets = self.config.dbs.tickets
        for tc in ticket_classes:
            for status in ['pending', 'confirmed', 'canceled', 'cancel_request']:
                tc[status] = tickets.get_tickets(
                    barcamp_id = self.barcamp._id,
                    ticketclass_id = tc._id,
                    status = status)

        has_tickets = self.barcamp.ticketmode_enabled and ticket_classes!=[]

        results = dict(
            has_event = has_event,
            has_sponsor = has_sponsor,
            has_logo = has_logo,
            has_twitter = has_twitter,
            has_hashtag = has_hashtag,
            has_facebook = has_facebook,
            has_seo = has_seo,
            has_tickets = has_tickets,

            is_public = is_public,
            is_active = is_active,
            has_timetable = has_timetable,
            ticketmode_enabled = self.barcamp.ticketmode_enabled,
            ticket_classes = ticket_classes
        )

        # compute the progress

        full_points = len(results)
        has_points = len([x for x in results.values() if x]) # len of all trues
        percentage = int(float(has_points) / float(full_points) * 100)

        results['full_points'] = full_points
        results['has_points'] = has_points
        results['percentage'] = percentage
        results['event_status'] = event_status

        return self.render(**results)

    post = get
