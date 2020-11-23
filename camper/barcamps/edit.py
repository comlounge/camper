#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler, LocationNotFound
import requests
import gettext
import pycountry
import uuid
from camper import utils
from camper.handlers.forms import WYSIWYGField

class ParticipantCountForm(BaseForm):
    size                = IntegerField(u"max. Teilnehmerzahl", [validators.Required()])

class BarcampEditForm(BaseForm):
    """form for adding a barcamp"""
    # base data
    name                = TextField(T("Title"), [validators.Length(max=300), validators.Required()],
                description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )

    description         = WYSIWYGField(T("Description"), [validators.Required()],
                description = T('please describe your barcamp here'),
    )
    slug                = TextField(T("slug / url name"), [validators.Required()],
                description = T('this is the short name, which appears in the URL. It can only contain letters and numbers as well as the characters _ and -. Examples are "barcamp_aachen" or "bcac"'),
    )
    hide_barcamp        = BooleanField(T('Hide Barcamp'), description=T(u'If enabled this will hide this barcamp from showing up in the front page and in search engines'))
    preregistration     = BooleanField(T('Enable Pre-Registration'), description=T(u'If enabled users can only pre-register and an admin needs to put them on the participation list manually. Please make sure you also change the waiting list mail template as this will be sent when a user pre-registers.'))
    send_email_to_admins= BooleanField(T('Enable notifications'), description=T(u'If enabled barcamp administrators will receive email notifications for new registrations, cancellations and new session proposals'))

    start_date          = DateField(T("start date"), [], format="%d.%m.%Y")
    end_date            = DateField(T("end date"), [], format="%d.%m.%Y")

    imprint             = WYSIWYGField(T("Imprint"), [validators.Required(), validators.Length(max=20000)], description=T("Please describe in detail who is responsible for this barcamp."))
    
    location_name                = TextField(T("name of location"), [], description = T('please enter the name of the venue here'),)
    location_street              = TextField(T("street and number "), [], description = T('street and number of the venue'),)
    location_city                = TextField(T("city"), [])
    location_zip                 = TextField(T("zip"), [])
    location_url                 = TextField(T("homepage"), [validators.Optional(), validators.URL()], description=T('web site of the venue (optional)'))
    location_phone               = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email               = TextField(T("email"), [validators.Optional(), validators.Email()], description=T('email address of the venue (optional)'))
    location_description         = TextAreaField(T("description"), [], description=T('an optional description of the venue'))
    location_country             = SelectField(T("Country"), default="DE")
    location_lat                 = HiddenField()
    location_lng                 = HiddenField()


class EditView(BarcampBaseHandler):
    """an index handler"""

    template = "admin/edit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        obj = copy.copy(self.barcamp)
        obj['location_name'] = self.barcamp.location['name']
        obj['location_street'] = self.barcamp.location['street']
        obj['location_city'] = self.barcamp.location['city']
        obj['location_zip'] = self.barcamp.location['zip']
        obj['location_country'] = self.barcamp.location['country']
        obj['location_email'] = self.barcamp.location['email']
        obj['location_phone'] = self.barcamp.location['phone']
        obj['location_url'] = self.barcamp.location['url']
        obj['location_lat'] = self.barcamp.location['lat']
        obj['location_lng'] = self.barcamp.location['lng']
        obj['location_description'] = self.barcamp.location['description']

        form = BarcampEditForm(self.request.form, obj = obj, config = self.config)

        # get countries and translate them
        try:
            trans = gettext.translation('iso3166', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        except IOError:
            # en only has iso3166_2
            trans = gettext.translation('iso3166_2', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        
        countries = [(c.alpha_2, trans.ugettext(c.name)) for c in pycountry.countries]
        form.location_country.choices = countries

        # remove the slug field if we are public already
        if self.barcamp.public:
            del form['slug']


        if self.request.method == 'POST' and form.validate():
            
            f = form.data

            # ignore preregistration changes if paid tickets is enabled
            # actually make sure it's enabled
            if self.barcamp.paid_tickets:
                if "preregistration" in f:
                    del f['preregistration']
                self.barcamp.preregistration = True

            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
                'country'   : f['location_country'],
                'lat'       : f['location_lat'] or None,
                'lng'       : f['location_lng'] or None,
            }

            # remember old values to check if they have changed
            old_street = self.barcamp.location['street']
            old_zip = self.barcamp.location['zip']
            old_city = self.barcamp.location['city']
            old_country = self.barcamp.location['country']

            # update it so we have the new data for comparison
            self.barcamp.update(f)

            # check location only if it actually has changed
            # also don't retrieve it if user has set own coordinates
            if self.request.form.get('own_coords', "no") != "yes":
                # computing coords from address
                changed = (f['location_city'] != old_city or
                    f['location_street'] != old_street or
                    f['location_zip'] != old_zip or
                    f['location_country'] != old_country)

                # in case the address has changed, to a lookup
                if changed and not self.config.testing:
                    street = self.barcamp.location['street']
                    city = self.barcamp.location['city']
                    zip = self.barcamp.location['zip']
                    country = self.barcamp.location['country']
                    country = self.barcamp.location.country_name
                    try:
                        lat, lng = self.retrieve_location(street, zip, city, country)
                        self.barcamp.location['lat'] = lat
                        self.barcamp.location['lng'] = lng
                    except LocationNotFound:
                        self.flash(self._("the city was not found in the geo database"), category="danger")
            else:
                    # using user provided coordinates
                    self.barcamp.update(f)

            self.barcamp.put()
            self.flash(self._("The barcamp has been updated."), category="info")
            return redirect(self.url_for("barcamps.edit", slug = self.barcamp.slug))
        return self.render(form = form, show_slug = not self.barcamp.public, bcid = str(self.barcamp._id))
    post = get


class MailsEditForm(BaseForm):
    """form for defining mail templates"""
    # base data
    welcome_subject         = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    welcome_text            = TextAreaField(T("Body"), [validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    onwaitinglist_subject   = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    onwaitinglist_text      = TextAreaField(T("Body"), [validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    fromwaitinglist_subject = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    fromwaitinglist_text    = TextAreaField(T("Body"), [validators.Required()],
                #description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )


class TicketMailsEditForm(BaseForm):
    """form for defining mail templates specific for tickets"""
    ticket_welcome_subject      = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],)
    ticket_welcome_text         = TextAreaField(T("Body"), [validators.Required()],)
    ticket_pending_subject      = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],)
    ticket_pending_text         = TextAreaField(T("Body"), [validators.Required()],)
    ticket_confirmed_subject    = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],)
    ticket_confirmed_text       = TextAreaField(T("Body"), [validators.Required()],)
    ticket_canceled_subject     = TextField(T("Subject"), [validators.Length(max=300), validators.Required()],)
    ticket_canceled_text        = TextAreaField(T("Body"), [validators.Required()],)

class MailsEditView(BarcampBaseHandler):
    """let the user define the mail templates"""

    template = "admin/mails_edit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        obj = AttributeMapper(self.barcamp.mail_templates)
        if self.barcamp.ticketmode_enabled:
            form = TicketMailsEditForm(self.request.form, obj = obj, config = self.config)
        else:
            form = MailsEditForm(self.request.form, obj = obj, config = self.config)
        if self.request.method == 'POST' and form.validate():
            self.barcamp.mail_templates = form.data
            self.barcamp.put()
            self.flash("Barcamp E-Mails aktualisiert", category="info")
            return redirect(self.url_for("barcamps.admin_wizard", slug = self.barcamp.slug))
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            **self.barcamp
        )
    post = get

class ParticipantsEditView(BarcampBaseHandler):
    """let the user increase the number of participants"""

    template = "admin/participants_edit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = ParticipantCountForm(self.request.form, obj = self.barcamp, config = self.config)
        min_count = self.barcamp.size
        form['size'].validators = [validators.Required(), validators.NumberRange(min=min_count, message=self._("you cannot reduce the participant number, the minimum amount is %s") %min_count)]
        if self.request.method == 'POST' and form.validate():
            size = form.data['size']

            self.barcamp.size = size

            # now move people from the waiting list to the particpating list
            obj = self.barcamp
            while obj.size > len(obj.event.participants) and len(obj.event.waiting_list)>0:
                nuid = obj.event.waiting_list[0]
                obj.event.waiting_list = obj.event.waiting_list[1:]
                obj.event.participants.append(nuid)

                # send out the mail 
                user = self.app.module_map.userbase.get_user_by_id(nuid)
                self.mail_template("fromwaitinglist",
                        view = self.barcamp_view,
                        barcamp = self.barcamp,
                        title = self.barcamp.name,
                        send_to = user.email,
                        fullname = user.fullname,
                        **self.barcamp)

            self.barcamp.put()
            self.flash("Barcamp aktualisiert", category="info")
            return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))
        return self.render(form = form, barcamp = self.barcamp)
    post = get













