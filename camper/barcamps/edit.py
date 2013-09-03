#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
import requests
from camper import utils

class ParticipantCountForm(BaseForm):
    size                = IntegerField(u"max. Teilnehmerzahl", [validators.Required()])

class BarcampEditForm(BaseForm):
    """form for adding a barcamp"""
    # base data
    name                = TextField(T("Title"), [validators.Length(max=300), validators.Required()],
                description = T('every barcamp needs a title. examples: "Barcamp Aachen 2012", "JMStVCamp"'),
    )

    description         = TextAreaField(T("Description"), [validators.Required()],
                description = T('please describe your barcamp here'),
    )
    slug                = TextField(T("slug / url name"), [validators.Required()],
                description = t('this is the short name, which appears in the URL. It can only contain letters and numbers as well as the characters _ and -. Examples are "barcamp_aachen" or "bcac"'),
    )
    start_date          = DateField(T("start date"), [], format="%d.%m.%Y")
    end_date            = DateField(T("end date"), [], format="%d.%m.%Y")
    twitterwall         = TextField(T("link to tweetwally twitterall"), [validators.Length(max=100)],
            description=T("create your own twitterwall at <a href='http://tweetwally.com'>tweetwally.com</a> and enter the URL here, e.g. <tt>http://jmstvcamp.tweetwally.com/</tt>"))
    twitter             = TextField(T("Twitter-Username"), [validators.Length(max=100)], description=T("only the username, max. 100 characters"))
    twitter             = TextField(T("Twitter-Username"), [validators.Length(max=100)], description=T("only the username, max. 100 characters"))
    hashtag             = TextField(T("Twitter-Hashtag"), [validators.Length(max=100)], description=T("max. 100 characters"))
    gplus               = TextField(T("Google Plus URL"), [validators.Length(max=100)], description=T("URL of the Google Plus Profile"))
    homepage            = TextField(T("Homepage URL"), [validators.Length(max=500)], description=T("link to the homepage of this barcamp in case one exists."))
    fbAdminId           = TextField(T("Facebook Admin-ID"), [validators.Length(max=100)], description=T("ID of the facebook admin for the facebook page for this barcamp if one exists"))

    location_name                = TextField(T("name of location"), [], description = T('please enter the name of the venue here'),)
    location_street              = TextField(T("street and number "), [], description = T('street and number of the venue'),)
    location_city                = TextField(T("city"), [])
    location_zip                 = TextField(T("zip"), [])
    location_url                 = TextField(T("homepage"), [], description=T('web site of the venue (optional)'))
    location_phone               = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email               = TextField(T("email"), [], description=T('email address of the venue (optional)'))
    location_description         = TextAreaField(T("description"), [], description=T('an optional description of the venue'))

class EditView(BaseHandler):
    """an index handler"""

    template = "edit.html"

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
        obj['location_description'] = self.barcamp.location['description']
        form = BarcampEditForm(self.request.form, obj = obj, config = self.config)
        if self.barcamp.public:
            del form['slug']
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['location'] = {
                'name'      : f['location_name'],
                'street'    : f['location_street'],
                'city'      : f['location_city'],
                'zip'       : f['location_zip'],
                'email'     : f['location_email'],
                'phone'     : f['location_phone'],
                'url'       : f['location_url'],
                'description' : f['location_description'],
                'country'   : 'de',
            }
            # do the nominatim request to find out lat/long but only if street and city have not changed
            if (form.data['location_street']!=self.barcamp.location['street'] or
               form.data['location_city']!=self.barcamp.location['city'] or
               form.data['location_zip']!=self.barcamp.location['zip']) or True:
                    url = "http://nominatim.openstreetmap.org/search?q=%s, %s&format=json&polygon=0&addressdetails=1" %(
                        form.data['location_street'],
                        form.data['location_city'],
                    )
                    data = requests.get(url).json()
                    if len(data)==0:
                        # trying again but only with city
                        url = "http://nominatim.openstreetmap.org/search?q=%s&format=json&polygon=0&addressdetails=1" %(
                            form.data['location_city'],
                        )
                        data = requests.get(url).json()
                    if len(data)==0:
                        self.flash(self._("the city was not found in the geo database"), category="danger")
                        return self.render(form = form)
                    # we have at least one entry, take the first one
                    result = data[0]
                    f['location']['lat'] = result['lat']
                    f['location']['lng'] = result['lon']
            self.barcamp.update(f)
            self.barcamp.put()
            self.flash("Barcamp aktualisiert", category="info")
            return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))
        return self.render(form = form)
    post = get


class ParticipantsEditView(BaseHandler):
    """let the user increase the number of participants"""

    template = "participants_edit.html"

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
            self.barcamp.put()
            self.flash("Barcamp aktualisiert", category="info")
            return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))
        return self.render(form = form, barcamp = self.barcamp)
    post = get


class ParticipantDataEditForm(BaseForm):
    """form for defining a pareticipant data form"""
    # base data
    title               = TextField(T("Name of field"), [validators.Length(max=300), validators.Required()],
                description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    description         = TextAreaField(T("Description"),
                description = T('please describe what the user should enter in this field.'),
    )
    fieldtype           = SelectField(T("field type"), [validators.Required()], choices=[('textfield',T('Textfeld')),('textarea',T('Textbereich'))],
                description = T('please chose between a one-line text field or multi-line text area'),
    )
    required            = BooleanField(T("field required?"),
                description = T('If you enable this then the user cannot register before this field has been filled in.'),
    )

class ParticipantsDataEditView(BarcampBaseHandler):
    """let the user define the participant data form fields"""

    template = "participants_data_edit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = ParticipantDataEditForm(self.request.form, config = self.config)
        registration_form = self.barcamp.registration_form
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['name'] = utils.string2filename(f['title'])
            self.barcamp.registration_form.append(f)
            self.barcamp.save()
            return redirect(self.url_for("barcamps.registration_form_editor", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            fields = self.barcamp.registration_form,
            **self.barcamp
        )

    post = get 

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        """delete a form entry"""
        idx = self.request.args.get("idx", None)
        rf = self.barcamp.registration_form
        if idx is not None and int(idx) < len(rf) and int(idx) >= 0:
            del self.barcamp.registration_form[int(idx)]
            self.barcamp.save()
        return redirect(self.url_for("barcamps.registration_form_editor", slug = self.barcamp.slug))
            












