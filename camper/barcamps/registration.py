from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from .base import BarcampBaseHandler
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions
import xlwt
from cStringIO import StringIO
import datetime

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

    template = 'participant_data.html'

    @ensure_barcamp()
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
                setattr(RegistrationForm, field['name'], TextField(field['title'], vs, description = field['description']))
            elif field['fieldtype'] == "textarea":
                vs.append(validators.Length(max = 2000))
                setattr(RegistrationForm, field['name'], TextAreaField(field['title'], vs, description = field['description']))
            
        form = RegistrationForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data

            # save data
            uid = unicode(self.user._id)
            self.barcamp.registration_data[uid] = f
            self.barcamp.save()

            # register the user
            self.register_participant()
            self.flash(self._('You have been registered!'))
            return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))


        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp)

    post = get

    def register_participant(self):
        """register the participant with this barcamp."""
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

class RegistrationDataExport(BarcampBaseHandler):
    """exports the barcamp registration data"""

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """export all the participant registration data"""
        form = self.barcamp.registration_form
        data = self.barcamp.registration_data

        filename = "%s-%s-participants.xls" %(datetime.datetime.now().strftime("%y-%m-%d"), self.barcamp.slug)

        # do the actual excel export
        wb = xlwt.Workbook()
        ws = wb.add_sheet('Registration Data')
        i = 1

        # headlines
        c = 1
        ws.write(0,0,"Name")
        for k in [f['title'] for f in form]:
            ws.write(0,c,k)
            c = c + 1

        # data
        for uid, record in data.items():
            # write participant name
            user = self.app.module_map.userbase.get_user_by_id(uid)
            ws.write(i, 0, unicode(user['fullname']))

            # write rest
            c = 1
            for field in [f['name'] for f in form]:
                ws.write(i, c, unicode(record.get(field, "n/a")))
                c = c + 1
            i = i + 1
        stream = StringIO()
        wb.save(stream)
        response = self.app.response_class(stream.getvalue(), content_type="application/excel")
        response.headers['Content-Disposition'] = 'attachment; filename="%s"' % filename
        return response



