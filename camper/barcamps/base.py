#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
import requests

__all__ = ['Action', 'SponsorForm', 'BarcampBaseHandler', 'LocationNotFound', 'LocationRetriever']

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

    def retrieve_location(self, street, zip, city, country):
        """retrieve coords for a location based on the address etc. stored in ``f``"""
        url = "http://open.mapquestapi.com/nominatim/v1/search.php?q=%s, %s, %s&format=json&polygon=0&addressdetails=1" %(
            street, city, country
        )
        data = requests.get(url).json()
        if len(data)==0:
            # trying again but only with city
            url = "http://open.mapquestapi.com/nominatim/v1/search.php?q=%s, %s&format=json&polygon=0&addressdetails=1" %(
                city,
                country
            )
            data = requests.get(url).json()
        if len(data)==0:
            raise LocationNotFound()

        # we have at least one entry, take the first one
        result = data[0]
        return result['lat'], result['lon']


