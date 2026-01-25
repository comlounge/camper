from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
from cStringIO import StringIO
import datetime

from camper.services import RegistrationService, RegistrationError, TicketService

class BarcampSubscribe(BarcampBaseHandler):
    """adds a user to the subscription list"""

    @ensure_barcamp()
    @logged_in()
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

    template = 'registration.html'

    @ensure_barcamp()
    @logged_in()
    def get(self, slug = None):
        """handle the barcamp registration for multiple events with optional registration form"""

        if self.barcamp.workflow != "registration":
            return "registration is not open yet"

        # check if the user has filled out all the required information on the form already
        uid = unicode(self.user._id)

        if not self.barcamp.registration_data.has_key(uid) and self.barcamp.registration_form:
            # user is not in list and we have a form
            return redirect(self.url_for(".registration_form", slug = self.barcamp.slug))

        # now check the fields
        if self.barcamp.registration_form:
            ok = True
            data = self.barcamp.registration_data[uid]
            for field in self.barcamp.registration_form:
                if field['required'] and field['name'] not in data:
                    ok = False
                    return redirect(self.url_for(".registration_form", slug = self.barcamp.slug))

        # user can register, show the list of events

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            has_form_data = self.barcamp.registration_data.has_key(uid),
            form_data = self.barcamp.registration_data.get(uid,{}),
            **self.barcamp)



class RegistrationData(BarcampBaseHandler):
    """handles registrations and cancels for events"""

    @ensure_barcamp()
    @asjson()
    def get(self, slug = None):
        """return the list of events with state of user"""
        if not self.logged_in:
            return {}
        r = []
        uid = unicode(self.user._id)
        for e in self.barcamp.eventlist:
            ud = {
                'eid' : e._id,
                'full' : e.full,
                'size' : e.size,
                'filled' : len(e.participants),
                'participant' : uid in e.participants,
                'waitinglist' : uid in e.waiting_list,
                'maybe' : uid in e.maybe,
            }
            r.append(ud)
        return r

    @ensure_barcamp()
    @asjson()
    @logged_in()
    def post(self, slug = None):
        """add a user to the participant or maybe list"""

        reg = RegistrationService(self, self.user)

        eid = self.request.form.get("eid")
        uid = unicode(self.user._id)
        event = self.barcamp.get_event(eid)
        status = self.request.form.get("status") # can be join, maybe, not
        
        try:
            reg.set_status(eid, status)
        except RegistrationError, e:
            return {
                'status' : 'error',
                'message' : 'registration is not possible'
            }

        ud = {
            'eid' : eid,
            'full' : event.full,
            'participant' : uid in event.participants,
            'waitinglist' : uid in event.waiting_list,
            'maybe' : uid in event.maybe,
            'size' : event.size,
            'filled' : len(event.participants),
        }
        return ud


class RegistrationForm(BarcampBaseHandler):
    """show the registration form to add and edit values"""

    template = 'participant_data.html'

    @ensure_barcamp()
    @logged_in()
    def get(self, slug = None):
        """show paticipants data form"""

        # create registration form programatically
        class RegistrationForm(BaseForm):
            pass

        for field in self.barcamp.registration_form:
            vs = []
            if field['required']:
                vs.append(validators.Required())
            if field['fieldtype'] == "textfield":
                vs.append(validators.Length(max = 400))
                setattr(RegistrationForm, field['name'], TextField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "textarea":
                vs.append(validators.Length(max = 2000))
                setattr(RegistrationForm, field['name'], TextAreaField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "checkbox":
                setattr(RegistrationForm, field['name'], BooleanField(field['title'], vs, description = field['description'] or " "))
            elif field['fieldtype'] == "select":
                setattr(RegistrationForm, field['name'], SelectField(field['title'], vs, description = field['description'] or " ", 
                    choices = field['choices']))

        uid = unicode(self.user._id)
        form_data = self.barcamp.registration_data.get(uid, {})
        form = RegistrationForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data

            # save data
            uid = unicode(self.user._id)
            self.barcamp.registration_data[uid] = f
            self.barcamp.save()
            self.flash(self._("Your information was updated"), category="success")
            return redirect(self.url_for(".user_events", slug = self.barcamp.slug))

        # show the form (and create it again with existing data)
        form = RegistrationForm(self.request.form, config = self.config, **form_data)
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp)


    post = get

class RegistrationDataExport(BarcampBaseHandler):
    """exports the barcamp registration data"""


    def export_tickets(self):
        """this is used in case a ticket registration is active"""
        form = self.barcamp.registration_form
        data = self.barcamp.registration_data
        tickets = self.config.dbs.tickets
        userbase = self.app.module_map.userbase
        ticket_classes = self.barcamp.ticketlist
        ticketservice = TicketService(self, self.user)


        all_tickets = tickets.get_tickets(barcamp_id = self.barcamp._id,
            status = ['confirmed', 'pending', 'canceled', 'cancel_request'])

        # retrieve all users
        uids = [t.user_id for t in all_tickets]
        users = userbase.get_users_by_ids(uids)
        userdict = {}
        for user in users:
            userdict[str(user._id)] = user
        for ticket in all_tickets:
            ticket['fullname'] = userdict[ticket.user_id].fullname
            ticket['ticketclass'] = ticket.ticketclass['name']

            
        # do the actual excel export
        wb = xlwt.Workbook()
        ws = wb.add_sheet('Registration Data')
        i = 1

        # headlines
        ws.write(0, 0, "Name")
        ws.write(0, 1, "Ticket")
        ws.write(0, 2, "Status")
        ws.write(0, 3, "Created")
        ws.write(0, 4, "Cancelled")
        ws.write(0, 5, "Cancel Requested")
        ws.write(0, 6, "Cancel Reason")

        
        # registration form data titles
        c = 7
        for k in [f['title'] for f in form]:
            ws.write(0, c, k)
            c = c + 1

        # now write all the users
        for ticket in all_tickets:
            c = 7
            ws.write(i, 0, unicode(ticket['fullname'])) 
            ws.write(i, 1, unicode(ticket['ticketclass'])) 
            ws.write(i, 2, unicode(ticket['workflow'])) 
            ws.write(i, 3, unicode(ticket['created'])) 
            ws.write(i, 4, unicode(ticket['cancel_date'])) 
            ws.write(i, 5, unicode(ticket['cancel_request_date'])) 
            ws.write(i, 6, unicode(ticket['cancel_reason'])) 

            # write registration data if present
            record = data.get(ticket.user_id, {})    
            for field in [f['name'] for f in form]:
                ws.write(i, c, unicode(record.get(field, "n/a")))
                c = c + 1

            i = i + 1
            
        return wb


    def export_events(self):
        """this is used in case a normal event registration is active"""
        form = self.barcamp.registration_form
        data = self.barcamp.registration_data

        users = {}
        ub = self.app.module_map.userbase

        def process_list(eid, userlist, state="going"):
            """process a user list"""
            for user in userlist:
                # Skip deleted users (GDPR compliance)
                if user is None:
                    continue

                uid = str(user._id)
                if uid not in users:
                    # new user
                    u = {
                        'fullname' : user.fullname,
                        'tshirt'   : user.tshirt,
                        'attendance' : {
                            eid : state
                        }
                    }
                    users[uid] = u
                else:
                    # set state for this event on existing user
                    users[uid]['attendance'][eid] = state 
            


        # retrieve all the users of all the lists 
        events = []
        for e in self.barcamp.eventlist:

            # gather event information
            date = e.date.strftime("%d.%m.%Y") # TODO: localize?
            title = e.name
            eid = str(e._id)
            column_title = "%s: %s" %(date, title)
            events.append({
                'id' : eid,
                'date' : date,
                'title' : title,
                'column' : column_title
            })

            # process users
            event = e
            maybe = list(ub.get_users_by_ids(event.maybe))
            waitinglist = [ub.get_user_by_id(uid) for uid in event.waiting_list]
            participants = [ub.get_user_by_id(uid) for uid in event.participants]

            
            process_list(eid, participants, "going")
            process_list(eid, maybe, "maybe")
            process_list(eid, waitinglist, "waiting")


        # do the actual excel export
        wb = xlwt.Workbook()
        ws = wb.add_sheet('Registration Data')
        i = 1

        # headlines
        ws.write(0, 0, "Name")

        # event titles
        c = 1
        for e in events:
            ws.write(0, c, e['column'])
            c = c + 1

        # registration form data titles
        for k in [f['title'] for f in form]:
            ws.write(0, c, k)
            c = c + 1

        # now write all the users
        for uid, record in users.items():
            c = 1
            ws.write(i, 0, unicode(record['fullname'])) #name

            # write attendance
            for e in events:
                attending = record['attendance'].get(e['id'], 'not going')
                ws.write(i, c, attending)
                c = c + 1

            # write registration data if present
            record = data.get(uid, {})    
            for field in [f['name'] for f in form]:
                ws.write(i, c, unicode(record.get(field, "n/a")))
                c = c + 1

            i = i + 1
            
        return wb

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """export all the participant registration data"""


        if self.barcamp.ticketmode_enabled:
            wb = self.export_tickets()
        else:
            wb = self.export_events()

        # write the actual file
        filename = "%s-%s-participants.xls" %(datetime.datetime.now().strftime("%y-%m-%d"), self.barcamp.slug)    
        stream = StringIO()
        wb.save(stream)
        response = self.app.response_class(stream.getvalue(), content_type="application/excel")
        response.headers['Content-Disposition'] = 'attachment; filename="%s"' % filename
        return response



