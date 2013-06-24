#encoding=utf8

import copy
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
import requests

class ParticipantCountForm(BaseForm):
    size                = IntegerField(u"max. Teilnehmerzahl", [validators.Required()])

class BarcampEditForm(BaseForm):
    """form for adding a barcamp"""
    # base data
    name                = TextField(u"Titel", [validators.Length(max=300), validators.Required()],
                description = u'Jedes Barcamp braucht einen Titel. Beispiel: "Barcamp Aachen 2012", "JMStVCamp"',
    )
    
    description         = TextAreaField(u"Beschreibung", [validators.Required()],
                description = u'Bitte beschreibe Dein Barcamp hier',
    )
    slug                = TextField(u"URL-Name", [validators.Required()],
                description = u'Dies ist der Kurzname, der in der URL auftaucht. Er darf nur Buchstaben und Zahlen sowie die Zeichen _ und - enthalten. Beispiele wären "barcamp_aachen" oder "bcac"',
    )
    start_date          = DateField(u"Start-Datum", [], format="%d.%m.%Y")
    end_date            = DateField(u"End-Datum", [], format="%d.%m.%Y")
    twitterwall         = TextField(u"Link zur tweetwally Twitterwall", [validators.Length(max=100)], 
            description="erstelle eine eigene Twitterwall bei <a href='http://tweetwally.com'>tweetwally.com</a> und trage hier die URL zu dieser ein, z.B. <tt>http://jmstvcamp.tweetwally.com/</tt>")
    twitter             = TextField(u"Twitter-Username", [validators.Length(max=100)], description="Nur der Username, max. 100 Zeichen")
    twitter             = TextField(u"Twitter-Username", [validators.Length(max=100)], description="Nur der Username, max. 100 Zeichen")
    hashtag             = TextField(u"Twitter-Hashtag", [validators.Length(max=100)], description="max. 100 Zeichen")
    gplus               = TextField(u"Google Plus URL", [validators.Length(max=100)], description="URL des Google Plus Profils")
    homepage            = TextField(u"Homepage URL", [validators.Length(max=500)], description="optionaler Link zu Homepage oder Blog des Barcamps, wenn vorhanden.")
    fbAdminId           = TextField(u"Facebook Admin-ID", [validators.Length(max=100)], description="optionale ID des Admins")

    location_name                = TextField(T("name of location"), [validators.Required()], description = T('please enter the name of the venue here'),)
    location_street              = TextField(T("street and number "), [validators.Required()], description = T('street and number of the venue'),)
    location_city                = TextField(T("city"), [validators.Required()])
    location_zip                 = TextField(T("zip"), [validators.Required()])
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
            return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
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
            return redirect(self.url_for("barcamp", slug = self.barcamp.slug))
        return self.render(form = form, barcamp = self.barcamp)
    post = get
