#encoding=utf8

from starflyer import Handler, redirect
from camper import BaseForm, db, logged_in, BaseHandler
from wtforms import *
from sfext.babel import T
import uuid

class BarcampAddForm(BaseForm):
    """form for adding a barcamp"""
    #created_by          = String() # TODO: should be ref to user
    
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
    start_date          = DateField(u"Start-Datum", [validators.Required()], format="%d.%m.%Y")
    end_date            = DateField(u"End-Datum", [validators.Required()], format="%d.%m.%Y")
    size                = IntegerField(u"max. Teilnehmerzahl", [validators.Required()])
    twitterwall         = TextField(u"Link zur Twitterwall", [validators.Length(max=100)], description="z.B. bei <a href='http://twitterwallr.de'>twitterwallr.de</a>")
    twitter             = TextField(u"Twitter-Username", [validators.Length(max=100)], description="Nur der Username, max. 100 Zeichen")
    hashtag             = TextField(u"Twitter-Hashtag", [validators.Length(max=100)], description="max. 100 Zeichen")
    gplus               = TextField(u"Google Plus URL", [validators.Length(max=100)], description="URL des Google Plus Profils")
    homepage            = TextField(u"Homepage URL", [validators.Length(max=500)], description="optionaler Link zu Homepage oder Blog des Barcamps, wenn vorhanden.")
    fbAppId             = TextField(u"Facebook appId", [validators.Length(max=100)], description="optionale Application ID")
    fbAdminId           = TextField(u"Facebook Admin-ID", [validators.Length(max=100)], description="optionale ID des Admins")

    location_name                = TextField(T("name of location"), [validators.Required()], description = T('please enter the name of the venue here'),)
    location_street              = TextField(T("street and number "), [validators.Required()], description = T('street and number of the venue'),)
    location_city                = TextField(T("city"), [validators.Required()])
    location_zip                 = TextField(T("zip"), [validators.Required()])
    location_url                 = TextField(T("homepage"), [], description=T('web site of the venue (optional)'))
    location_phone               = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email               = TextField(T("email"), [], description=T('email address of the venue (optional)'))
    location_description         = TextAreaField(T("description"), [], description=T('an optional description of the venue'))

class AddView(BaseHandler):
    """an index handler"""

    template = "barcamp/add.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = BarcampAddForm(self.request.form, config = self.config)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['admins'] = [self.user._id]
            f['created_by'] = self.user._id
            f['subscribers'] = [self.user._id]
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

            pid = unicode(uuid.uuid4())[:8]
            pid = f['planning_pad'] = "%s_%s" %(f['slug'],pid)
            did = f['slug']
            self.config.etherpad.createPad(padID=pid, text=u"Planung")
            self.config.etherpad.createPad(padID=did, text=u"Dokumentation")
            f['documentation_pad'] = did
            barcamp = db.Barcamp(f, collection = self.config.dbs.barcamps)
            barcamp = self.config.dbs.barcamps.put(barcamp)

            self.flash("Barcamp %s wurde angelegt" %f['name'], category="info")
            return redirect(self.url_for("index"))
        return self.render(form = form)
    post = get
