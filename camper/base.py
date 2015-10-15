# encoding=utf-8
import starflyer
from starflyer import redirect, AttributeMapper
import functools
import urllib
import wtforms
import userbase
from xhtml2pdf import pisa
import werkzeug.exceptions
from sfext.babel import T
from sfext.uploader import AssetNotFound
from HTMLParser import HTMLParser
from functools import partial
import requests 
import bson
from mongogogo import ObjectNotFound

from wtforms.ext.i18n.form import Form

__all__ = ["BaseForm", "BaseHandler", "logged_in", "aspdf", 'LocationNotFound', 'ensure_barcamp', 'is_admin', 'ensure_page', 'is_main_admin', 'is_participant', 'BarcampView']

class LocationNotFound(Exception):
    """raised when a location was not found"""

class UserView(object):
    """adapter for a user object to provide additional data such as profile image etc."""

    def __init__(self, app, user):
        """initialize the adapter with the app object and the user object"""

        self.app = app
        self.user = user

    @property
    def image_thumb(self):
        """return the image"""
        u = self.user
        uf = self.app.url_for
        if u.image is not None and u.image!="":
            try:
                return uf("asset", asset_id = self.app.module_map.uploader.get(u.image).variants['userlist']._id)
            except AssetNotFound:
                pass
            except KeyError:
                pass
        return None

    @property
    def image_thumb_tag(self):
        """return the image tag"""
        u = self.user
        uf = self.app.url_for
        image = None
        if u.image is not None and u.image!="":
            try:
                image =  uf("asset", asset_id = self.app.module_map.uploader.get(u.image).variants['userlist']._id)
            except AssetNotFound:
                pass
            except KeyError:
                pass
        if image is not None:
            return """<img alt="%s" class="profile-image-userlist" src="%s">""" %(u.fullname, image)
        return """<div class="profile-image-userlist missing"><i class="fa fa-user"></i></div>"""

    @property
    def barcamps(self):
        """return a list of barcamps the user either is an admin for or takes parts in"""


class BarcampView(object):
    """wrapper around the barcamp to provide view functions"""

    def __init__(self, barcamp, handler):
        """initialize the adapter with the barcamp and the handler in use"""
        self.barcamp = barcamp
        self.handler = handler
        self.app = self.handler.app
        self.config = self.handler.app.config
        self.user = self.handler.user

    @property
    def logo(self):
        """show the logo tag"""
        try:
            asset = self.app.module_map.uploader.get(self.barcamp.logo)
        except AssetNotFound:
            asset = None
        if not asset:
            return u""
        v = asset.variants['logo_full']
        url = self.app.url_for("asset", asset_id = v._id)
        return """<a title="%s" href="%s"><img alt="%s" class="img-responsive" src="%s" width="%s" height="%s"></a>""" %(
            self.barcamp.name,
            self.handler.url_for("barcamps.index", slug = self.barcamp.slug),
            'Logo '+self.barcamp.name,
            url,
            v.metadata['width'],
            v.metadata['height'])

    @property
    def logo_url(self):
        """return variants of the logo url"""
        asset = self._get_image(self.barcamp.logo)
        if asset is None:
            return None
        uf = self.app.url_for
        return dict(
                [(vid, uf('asset', asset_id = asset._id)) for vid, asset in asset.variants.items()]
        )

    def _get_image(self, asset_id):
        """try to get an image by it's asset id or return None"""
        try:
            return self.app.module_map.uploader.get(asset_id)
        except AssetNotFound:
            return None
        except Exception, e:
            return None
        return None


    @property
    def og_logo(self):
        """return the logo for the open graph tag"""
        # first try fb logo
        uf = self.app.url_for
        img = self._get_image(self.barcamp.fb_image)
        if img is None:
            img = self._get_image(self.barcamp.logo)
        if img is None:
            return "" # no url

        v = img.variants.get('facebook', None) # fb size
        if v is None:
            return ""
        return self.app.url_for("asset", asset_id = v._id, _full=True)

    @property
    def logosmall(self):
        """show the logo tag"""
        try:
            asset = self.app.module_map.uploader.get(self.barcamp.logo)
        except AssetNotFound:
            asset = None
        if not asset:
            return u""
        v = asset.variants['medium_user']
        url = self.app.url_for("asset", asset_id = v._id)
        return """<a href="%s"><img src="%s" width="%s" height="%s"></a>""" %(
            self.handler.url_for("barcamps.index", slug = self.barcamp.slug),
            url,
            v.metadata['width'],
            v.metadata['height'])

    @property
    def has_gallery(self):
        """return whether this barcamp features a gallery"""
        if self.barcamp.gallery and self.barcamp.gallery == "-1":
            return False
        try:
            gallery = self.config.dbs.galleries.get(bson.ObjectId(self.barcamp.gallery))
        except:
            return False
        return True


    @property
    def gallery(self):
        """return the gallery"""
        gallery = self.config.dbs.galleries.get(bson.ObjectId(self.barcamp.gallery))
        return gallery


    @property
    def date(self):
        """properly format the start and end date if given"""
        bc = self.barcamp
        if bc.start_date and bc.end_date:
            # TODO: localize it
            return "%s - %s" %(
                bc.start_date.strftime('%d.%m.%Y'),
                bc.end_date.strftime('%d.%m.%Y'))
        else:
            return self.handler._("date to be announced")

    @property
    def short_location(self):
        """properly format the location of the barcamp if given"""
        bc = self.barcamp
        location = AttributeMapper(bc.location)
        if location.name and location.city:
            return "%s, %s" %(location.name, location.city)
        else:
            return self.handler._("location to be announced")

    @property
    def is_admin(self):
        """true if the logged in user is a barcamp admin"""
        if self.user is None:
            return False
        if unicode(self.user._id) in self.barcamp.admins:
            return True
        if self.user.is_admin:
            return True
        return False

    @property
    def is_subscriber(self):
        """true if the logged in user is a barcamp subscriber"""
        if self.user is None:
            return False
        if unicode(self.user._id) in self.barcamp.subscribers:
            return True
        return False

    @property
    def is_participant(self):
        """true if the logged in user is a barcamp participant"""
        if self.user is None:
            return False
        if unicode(self.user._id) in self.barcamp.event.participants:
            return True
        return False

    @property
    def is_on_waiting_list(self):
        """true if the logged in user is on the barcamp waiting list"""
        if self.user is None:
            return False
        if unicode(self.user._id) in self.barcamp.event.waiting_list:
            return True
        return False

    @property
    def can_subscribe(self):
        """check if the subscribe button should be shown. Cases in which it should:

        - the user is neither a participant nor on the waiting list
        - the user is not subscribed already
        """
        if self.is_participant or self.is_on_waiting_list:
            return False
        if self.is_subscriber:
            return False
        return True

    @property
    def can_add_menu_page(self):
        """this is True if the user is an admin and there are less than 3 pages for the menu slot"""
        if not self.is_admin:
            return False
        return self.config.dbs.pages.for_slot("menu", barcamp=self.barcamp).count() < 3

    def pages_for(self, slot):
        """return all the pages for a given slot and barcamp"""
        return self.config.dbs.pages.for_slot("menu", barcamp=self.barcamp)

    @property
    def sponsors(self):
        res = []
        i = 0
        for sponsor in self.barcamp.sponsors:
            width = 220
            tag = """<a title="%s" href="%s"><img alt="%s" width="%s" src="%s"></a>""" %(
                sponsor['name'],
                sponsor['url'],
                sponsor['name'],
                width,
                self.handler.url_for("asset", asset_id = sponsor['logo']))
            res.append(
                {'url'  : sponsor['url'],
                 'name'  : sponsor['name'],
                 'idx'  : i,
                 'image'  : tag
                })
            i=i+1
        return res

    @property
    def background_image_url(self):
        """return variants of background image url"""
        uf = self.app.url_for
        try:
            asset = self.app.module_map.uploader.get(self.barcamp.background_image)
        except AssetNotFound:
            return None
        except Exception, e:
            return None
        return dict(
                [(vid, uf('asset', asset_id = asset._id)) for vid, asset in asset.variants.items()]
        )

    @property
    def fb_image_url(self):
        """return variants of facebook image url"""
        uf = self.app.url_for
        try:
            asset = self.app.module_map.uploader.get(self.barcamp.fb_image)
        except AssetNotFound:
            return None
        except Exception, e:
            return None
        return dict(
                [(vid, uf('asset', asset_id = asset._id)) for vid, asset in asset.variants.items()]
        )
    
    def background_image(self, **kwargs):
        """return the title image tag"""
        try:
            asset = self.app.module_map.uploader.get(self.barcamp.background_image)
        except AssetNotFound:
            asset = None
        if not asset:
            return u""
        v = asset.variants['full']
        url = self.app.url_for("asset", asset_id = v._id)
        amap = html_params(**kwargs)
        return """<img src="%s" width="%s" height="%s" %s>""" %(
            url,
            v.metadata['width'],
            v.metadata['height'],
            amap)

class MLStripper(HTMLParser):
    """html parser for stripping all tags from a string"""

    def __init__(self):
        self.reset()
        self.fed = []

    def handle_data(self, d):
        self.fed.append(d)

    def get_data(self):
        return ''.join(self.fed)


class logged_in(object):
    """check if a valid user is present"""

    def __call__(self, method):
        """check user"""
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.user is None:
                self.flash(self._('Please log in.'), category="danger")
                return redirect(self.url_for("userbase.login", force_external=True))
            return method(self, *args, **kwargs)
        return wrapper


class ensure_barcamp(object):
    """ensure that a valid barcamp exists"""

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.barcamp is None:
                raise werkzeug.exceptions.NotFound()
            return method(self, *args, **kwargs)
        return wrapper


class ensure_page(object):
    """ensure that a valid page exists"""

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.page is None:
                raise werkzeug.exceptions.NotFound()
            return method(self, *args, **kwargs)
        return wrapper


class is_admin(object):
    """ensure that the logged in user is a barcamp admin"""

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.user is None:
                self.flash(self._("you don't have the correct permissions to access this page."), category="error")
                return redirect(self.url_for("index"))
            if self.user.has_permission("admin"):
                return method(self, *args, **kwargs)
            if unicode(self.user._id) in self.barcamp.admins:
                return method(self, *args, **kwargs)
            self.flash(self._("You don't have the correct permissions to access this page."), category="error")
            return redirect(self.url_for("index"))
        return wrapper


class is_participant(object):
    """ensure that the logged in user is a barcamp participant"""

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.user is None:
                self.flash(self._(u"you don't have the permission to access this page."), category="error")
                return redirect(self.url_for("index"))
            if unicode(self.user._id) in self.barcamp.admins:
                return method(self, *args, **kwargs)
            if self.user.has_permission("admin"):
                return method(self, *args, **kwargs)
            self.flash(self._(u"you don't have the permission to access this page."), category="error")
            return redirect(self.url_for("index"))
        return wrapper


class is_main_admin(object):
    """ensure that the logged in user is a main admin"""

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.user is None:
                self.flash(self._(u"you don't have the permission to access this page."), category="error")
                return redirect(self.url_for("index"))
            elif not self.user.has_permission("admin"):
                self.flash(self._(u"you don't have the permission to access this page."), category="error")
                return redirect(self.url_for("index"))
            return method(self, *args, **kwargs)
        return wrapper


class aspdf(object):
    """converts a template to PDF"""

    def __call__(self, method):
        """takes a dict output of a handler method and returns it as JSON wrapped in a Response"""

        that = self
    
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            html = method(self, *args, **kwargs)
            pdf = pisa.CreatePDF(html)

            response = self.app.response_class()
            response.content_type = "application/pdf"
            #response.content_disposition = "attachment; filename=\"...\""
            response.data = pdf.dest.getvalue()
            return response
            
        return wrapper


class BaseForm(Form):
    """a form which also carries the config object"""

    LANGUAGES = ['de', 'en']

    def __init__(self, formdata=None, obj = None, prefix='', config = None, app = None, handler = None, **kwargs):
        super(BaseForm, self).__init__(formdata=formdata, obj=obj, prefix=prefix, **kwargs)
        self.config = config
        self.app = app
        self.handler = handler


class BaseHandler(starflyer.Handler):
    """an extended handler """

    remember_url = False

    selected_action = None
    wf_map = {
        u'created'      : u"angelegt",
        u'announced'    : u"angekündigt ",
        u'open'         : u"Registrierung offen ",
        u'running'      : u"findet statt",
        u'closed'       : u"abgeschlossen",
    }

    def before(self):
        """prepare the handler"""
        if "slug" in self.request.view_args:
            self.barcamp = self.config.dbs.barcamps.by_slug(self.request.view_args['slug'])
            self.barcamp_view = BarcampView(self.barcamp, self)
            self.barcamp_id = self.barcamp._id
        else:
            self.barcamp = None
            self.barcamp_view = None
        if "page_slug" in self.request.view_args:
            self.page = self.config.dbs.pages.by_slug(self.request.view_args['page_slug'], barcamp = self.barcamp)
        else:
            self.page = None
        super(BaseHandler, self).before()

    @property
    def is_main_admin(self):
        """true if the logged in user is a main admin"""
        if self.user is None:
            return False
        return self.user.has_permission("admin")

    @property
    def is_admin(self):
        """check if the given user is a barcamp admin"""
        if self.is_main_admin:
            return True
        if self.user is not None and self.barcamp is not None:
            if unicode(self.user._id) in self.barcamp.admins:
                return True
        return False

    @property
    def logged_in(self):
        """check if the given user is logged in"""
        return self.user is not None

    @property
    def render_context(self):
        """provide more information to the render method"""
        menu_pages = self.config.dbs.pages.for_slot("menu")
        footer_pages = self.config.dbs.pages.for_slot("footer")
        payload = dict(
            wf_map = self.wf_map,
            user = self.user,
            barcamp = self.barcamp,
            #txt = self.config.i18n.de,
            title = self.config.title,
            url = self.request.url,
            description = self.config.description,
            vpath = self.config.virtual_path,
            vhost = self.config.virtual_host,
            is_admin = self.is_admin,
            is_main_admin = self.is_main_admin,
            menu_pages = menu_pages,
            user_id = self.user_id,
            mapbox_access_token = self.config.mapbox_access_token,
            mapbox_map_id = self.config.mapbox_map_id,
            footer_pages = footer_pages,
            ga = self.config.ga,
            userview = partial(UserView, self.app),
            image_tag = self.get_image_tag,
        )
        if self.barcamp is not None:
            payload['slug'] = self.barcamp.slug
        if self.page is not None:
            payload['page_slug'] = self.page.slug
        return payload

    def get_image_tag(self, image_id, variant, **kw):
        """return an image tag for an image

        :param image_id: the asset id of the image
        :param variant: the variant to use
        :param **kw: any additional parameters for the image tag
        :return: an image tag
        """
        asset = self.app.module_map.uploader.get(image_id)
        v = asset.variants[variant]
        url = self.app.url_for("asset", asset_id = v._id)
        tag = """<img src="%s" width="%s" height="%s" %s>""" %(
            url,
            v.metadata['width'],
            v.metadata['height'],
            "")
        return tag

    def forbidden(self):
        """call this if you want to show the user a message that a permission is missing and redirect to the homepage"""
        self.flash(self._("You don't have the correct permissions to access this page."), category="error")
        # TODO: maybe check barcamp and permissions for the barcamp homepage and redirect there instead
        # TODO: maybe create a remember decorator which remember the last page in the session which is safe to redirect to.
        # the forbidden handler should delete it though
        return redirect(self.url_for("index"))

    def strip_tags(self, html):
        """strip all html tags from the html string"""
        s = MLStripper()
        s.feed(html)
        return s.get_data()

    def mail_text(self, template_name, subject, send_to=None, user = None, **kwargs):
        """render and send out a mail as mormal text"""
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        payload = self.render_lang(template_name, **kwargs)
        mailer = self.app.module_map['mail']
        mailer.mail(send_to, subject, payload)

    def mail_template(self, template_name, send_to=None, user = None, **kwargs):
        """render and send out a mail as normal text"""
        barcamp = kwargs.get('barcamp')
        if user is None:
            user = self.user
        if send_to is None:
            send_to = user.email
        if barcamp is not None:
            subject = barcamp.mail_templates['%s_subject' %template_name]
            payload = barcamp.mail_templates['%s_text' %template_name].replace('((fullname))', user.fullname)
            mailer = self.app.module_map['mail']
            mailer.mail(send_to, subject, payload)

    def retrieve_location(self, street, zip, city, country):
        """retrieve coords for a location based on the address etc. stored in ``f``"""
        
        query = u"%s, %s, %s" %(street, city, country)
        query = urllib.quote(query.encode("utf-8"))

        url = "https://api.mapbox.com/v4/geocode/mapbox.places/%s.json?access_token=%s" %(query, self.config.mapbox_access_token)
        data = requests.get(url).json()
        data = data['features']

        if len(data)==0:
            query = u"%s, %s" %(city, country)
            query = urllib.quote(query.encode("utf-8"))

            # trying again but only with city
            url = "https://api.mapbox.com/v4/geocode/mapbox_places/%s.json?access_token=%s" %(query, self.config.mapbox_access_token)
            data = requests.get(url).json()
            data = data['features']

        if len(data)==0:
            raise LocationNotFound()

        # for some reason in geojson it is (long,lat). Oh yeah
        return tuple(reversed(data[0]['center']))



