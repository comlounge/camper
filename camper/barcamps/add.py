#encoding=utf8

from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, logged_in, BaseHandler
from wtforms import *
from sfext.babel import T
import uuid
import datetime
import requests
import pycountry
import gettext
from ..form import MyDateField
from camper.handlers.forms import WYSIWYGField


class BarcampAddForm(BaseForm):
    """form for adding a barcamp"""
    #created_by          = String() # TODO: should be ref to user

    # base data
    name                = TextField(u"Titel", [validators.Length(max=300), validators.Required()],
                description = u'Jedes Barcamp braucht einen Titel. Beispiel: "Barcamp Aachen 2012", "JMStVCamp"',
    )

    description         = WYSIWYGField(T("Description"), [validators.Required()],
                description = T('please describe your barcamp here'),
    )
    slug                = TextField(u"URL-Name", [validators.Required()],
                description = u'Dies ist der Kurzname, der in der URL auftaucht. Er darf nur Buchstaben und Zahlen sowie die Zeichen _ und - enthalten. Beispiele wären "barcamp_aachen" oder "bcac"',
    )
    hide_barcamp        = BooleanField(T('Hide Barcamp'), description=T(u'If enabled this will hide this barcamp from showing up in the front page and in search engines'))
    preregistration     = BooleanField(T('Enable Pre-Registration'), description=T(u'If enabled users can only pre-register and an admin needs to put them on the participation list manually. Please make sure you also change the waiting list mail template as this will be sent when a user pre-registers.'))
    send_email_to_admins= BooleanField(T('Send email notifications'), description=T(u'If enabled barcamp administrators will receive notifications about people registering and unregistering from the barcamp'))
    hide_barcamp        = BooleanField(T('Hide Barcamp'), description=T(u'If enabled this will hide this barcamp from showing up in the front page and in search engines'))
    start_date          = MyDateField(u"Start-Datum", [], default=None, format="%d.%m.%Y")
    end_date            = MyDateField(u"End-Datum", [], default=None, format="%d.%m.%Y")
    twitterwall         = TextField(u"Link zur tweetwally Twitterwall", [validators.Length(max=100)],
            description="erstelle eine eigene Twitterwall bei <a href='http://tweetwally.com'>tweetwally.com</a> und trage hier die URL zu dieser ein, z.B. <tt>http://jmstvcamp.tweetwally.com/</tt>")
    fbAdminId           = TextField(u"Facebook Admin-ID", [validators.Length(max=100)], description="optionale ID des Admins")
    
    location_name                = TextField(T("name of location"), [], description = T('please enter the name of the venue here'),)
    location_street              = TextField(T("street and number "), [], description = T('street and number of the venue'),)
    location_city                = TextField(T("city"), [])
    location_zip                 = TextField(T("zip"), [])
    location_url                 = TextField(T("homepage"), [], description=T('web site of the venue (optional)'))
    location_phone               = TextField(T("phone"), [], description=T('web site of the venue (optional)'))
    location_email               = TextField(T("email"), [], description=T('email address of the venue (optional)'))
    location_description         = TextAreaField(T("description"), [], description=T('an optional description of the venue'))
    location_country             = SelectField(T("Country"), default="DE")
    location_lat                 = HiddenField()
    location_lng                 = HiddenField()


class AddView(BaseHandler):
    """an index handler"""

    template = "admin/add.html"

    @logged_in()
    def get(self):
        """render the view"""
        form = BarcampAddForm(self.request.form, config = self.config)

        # get countries and translate them
        try:
            trans = gettext.translation('iso3166', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        except IOError:
            # en only has iso3166_2
            trans = gettext.translation('iso3166_2', pycountry.LOCALES_DIR,
                languages=[str(self.babel_locale)])
        
        countries = [(c.alpha2, trans.ugettext(c.name)) for c in pycountry.countries]
        form.location_country.choices = countries
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
                'country'   : f['location_country'],
            }

            pid = unicode(uuid.uuid4())[:8]
            pid = f['planning_pad'] = "%s_%s" %(f['slug'],pid)
            did = f['slug']
            if not self.config.testing:
                try:
                    self.config.etherpad.createPad(padID=pid, text=u"Planung")
                    self.config.etherpad.createPad(padID=did, text=u"Dokumentation")
                except Exception, e:
                    print "problem creating a pad"
                    print e
                    self.flash(self._("Attention: One or both of the etherpads exist already!"), category="warning")
                    pass
            f['documentation_pad'] = did

            # retrieve geo location (but only when not in test mode as we might be offline)
            if form.data['location_street'] and not self.config.testing:
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

            # create and save the barcamp object
            barcamp = db.Barcamp(f, collection = self.config.dbs.barcamps)

            # create default mail templates
            url = self.url_for("barcamps.index", slug = barcamp.slug, _full=True)
            templates = {}
            templates['welcome_text'] = self.render_lang("emails/default_welcome.txt", barcamp=barcamp, url=url)
            templates['welcome_subject'] = self._('Welcome to %s') %barcamp.name
            templates['onwaitinglist_text'] = self.render_lang("emails/default_onwaitinglist.txt", barcamp=barcamp, url=url)
            templates['onwaitinglist_subject'] = self._("Unfortunately list of participants is already full. You have been put onto the waiting list and will be informed should you move on to the list of participants.")
            templates['fromwaitinglist_text'] = self.render_lang("emails/default_fromwaitinglist.txt", barcamp=barcamp, url=url)
            templates['fromwaitinglist_subject'] = self._("You are now on the list of participants for this barcamp.")

            # set mail templates for ticketing
            templates['ticket_welcome_text'] = self.render_lang("emails/default_ticket_welcome.txt", barcamp=barcamp, url=url)
            templates['ticket_welcome_subject'] = self._('Welcome to %s') %barcamp.name
            templates['ticket_pending_text'] = self.render_lang("emails/default_ticket_pending.txt", barcamp=barcamp, url=url)
            templates['ticket_pending_subject'] = self._("Your ticket reservation is pending.")
            templates['ticket_confirmed_text'] = self.render_lang("emails/default_ticket_confirmed.txt", barcamp=barcamp, url=url)
            templates['ticket_confirmed_subject'] = self._("Your ticket for %s.") %barcamp.name
            templates['ticket_canceled_text'] = self.render_lang("emails/default_ticket_canceled.txt", barcamp=barcamp, url=url)
            templates['ticket_canceled_subject'] = self._("Your ticket for %s.") %barcamp.name
            barcamp.update({'mail_templates':templates})

            barcamp = self.config.dbs.barcamps.put(barcamp)

            self.flash(self._("%s has been created") %f['name'], category="info")
            return redirect(self.url_for("barcamps.admin_wizard", slug = barcamp.slug))
        return self.render(form = form, slug = None, show_slug=True, bcid = '')
    post = get

class ValidateView(BaseHandler):
    """a handler for remote barcamp data validation"""

    @logged_in()
    @asjson()
    def get(self):
        """retrieve the data via params and validate the given fields

        This can be used for both the add and edit view. On edit views it will
        make sure that e.g. a urlname is not checked against the edited barcamp
        itself.

        """
        orig_slug = None
        bcid = self.request.args.get("bcid", None) # bcid can be None on the add screen

        if "slug" in self.request.args:
            bc = self.config.dbs.barcamps.by_slug(self.request.args['slug'])

            # check if there exists no barcamp with this slug yet
            if bc is None:
                return {'validated' : True}

            # check if we have an existing barcamp and it's not it's own slug
            new_slug_id = str(bc._id)
            if new_slug_id == bcid:
                return {'validated' : True}
                
            return {
                'validated' : False,
                'msg' : self._("This name is already taken. Please choose a different one")
            }
        return {'validated' : False} # slug should appear, really!



