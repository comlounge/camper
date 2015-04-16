#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
import requests
from sfext.uploader import AssetNotFound


__all__ = ['Action', 'SponsorForm', 'BarcampBaseHandler', 'LocationNotFound', 'LocationRetriever', 'GalleryView']

class LocationNotFound(Exception):
    """raised when a location was not found"""

class Action(object):
    """an action to be display in navbars etc."""

    def __init__(self, aid, name, url, active=False):
        """initialize the action with 

        :param aid: a unique id of the action, e.g. "info"
        :param name: The name to be displayed, e.g. "Information"
        :param url: The URL it should link to
        :param active: whether this action is active at the moment or not
        """

        self.aid = aid
        self.name = name
        self.url = url
        self.active = active

class BarcampBaseHandler(BaseHandler):
    """extend the base handler for barcamp specific extensions"""

    action = None

    def before(self):
        """our own before handler"""
        super(BarcampBaseHandler, self).before()
        self.last_url = self.session.get("came_from", None)
        if self.request.method == "GET":
            self.session['came_from'] = self.request.url
        elif "came_from" in self.session:
            del self.session['came_from']

    @property
    def actions(self):
        """return the possible menu actions for a barcamp as well as a flag if it's active or not"""
        actions = []
        uf = self.url_for
        bc = self.barcamp
        # we need to check for barcamp as pages use this handler, too and pages can also be on the top level 
        if bc is not None:
            actions.append(Action('home', T("Home"), uf('barcamps.index', slug = self.barcamp.slug), self.action == 'home'))
            actions.append(Action('sessions', T("session proposals"), uf('barcamps.sessions', slug = bc.slug), self.action == 'sessions'))
            actions.append(Action('events', T("events"), uf('barcamps.user_events', slug = bc.slug), self.action == 'events'))
            if bc.planning_pad_public or self.is_admin:
                actions.append(Action('planning', T("planning"), uf('barcamps.planning_pad', slug = bc.slug), self.action == 'planning'))
            #actions.append(Action('docs', T("documentation"), uf('barcamps.documentation_pad', slug = bc.slug), self.action == 'docs'))
            actions.append(Action('blog', T("Blog"), uf('blog.view', slug = bc.slug), self.action == 'blog'))
            actions.append(Action('design', T("Design"), uf('barcamps.admin_design', slug = bc.slug), self.action == 'design'))
            for page in self.barcamp_view.pages_for("menu"):
                pid = "page_%s" %page._id
                actions.append(Action(pid, page.menu_title, uf('barcamp_page', slug = bc.slug, page_slug = page.slug), self.action == pid))
            if bc.twitterwall:
                if bc.twitterwall.find("tweetwally") != -1:
                    actions.append(Action('twitterwall', T("Twitterwall"), uf("barcamps.tweetwally", slug = bc.slug), self.action == 'twitterwall'))
                else:
                    actions.append(Action('twitterwall', T("Twitterwall"), bc.twitterwall, self.action == 'twitterwall'))
        return actions


    @property
    def render_context(self):
        """provide more information to the render method"""
        payload = super(BarcampBaseHandler, self).render_context
        payload['view'] = self.barcamp_view
        payload['actions'] = self.actions
        return payload


class GalleryView(object):
    """wrapper around an image gallery to provide additional features"""

    def __init__(self, gallery, handler):
        """initialize the wrapper with the gallery and the handler it is used with"""

        self.gallery = gallery
        self.handler = handler
        self.app = self.handler.app
        self.config = self.handler.app.config
        self.user = self.handler.user

    def get_images(self, variant = "userlist", **kwargs):
        """return image tags for all the images

        :param variant: variant of the image to retrieve
        :param kwargs: additional attributes to be added to the image tag

        :returns: list of html image tags

        """

        amap = html_params(**kwargs)

        images = []
        for aid in self.gallery.images:
            try:
                asset = self.app.module_map.uploader.get(aid)
                v = asset.variants[variant]
                url = self.app.url_for("asset", asset_id = v._id)
                images.append("""<img src="%s" width="%s" height="%s" %s>""" %(
                    url,
                    v.metadata['width'],
                    v.metadata['height'],
                    amap))
            except AssetNotFound:
                # shouldn't really happen but what do I know?!?
                continue

        return images
