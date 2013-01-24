#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions

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

class SponsorForm(BaseForm):
    """form for adding a new sponsor"""
    # base data
    name                = TextField(u"Name des Sponsors", [validators.Length(max=300), validators.Required()])
    url                 = TextField(u"URL des Sponsor-Website", [validators.URL(), validators.Required()])
    image               = UploadField(u"Sponsor-Logo")

class BarcampBaseHandler(BaseHandler):
    """extend the base handler for barcamp specific extensions"""

    action = None

    @property
    def actions(self):
        """return the possible menu actions for a barcamp as well as a flag if it's active or not"""
        actions = []
        uf = self.url_for
        bc = self.barcamp
        actions.append(Action('home', T("Home"), uf('barcamp', slug = self.barcamp.slug), self.action == 'home'))
        actions.append(Action('sessions', T("session proposals"), uf('barcamp_sessions', slug = bc.slug), self.action == 'sessions'))
        if bc.planning_pad_public and self.is_admin:
            actions.append(Action('planning', T("planning"), uf('barcamp_planning_pad', slug = bc.slug), self.action == 'planning'))
        actions.append(Action('docs', T("documentation"), uf('barcamp_documentation_pad', slug = bc.slug), self.action == 'docs'))
        for page in self.barcamp_view.pages_for("menu"):
            pid = "page_%s" %page._id
            actions.append(Action(pid, page.menu_title, uf('barcamp_page', slug = bc.slug, page_slug = page.slug), self.action == pid))
        actions.append(Action('twitterwall', T("Twitterwall"), bc.twitterwall, self.action == 'twitterwall'))
        return actions


    @property
    def render_context(self):
        """provide more information to the render method"""
        sponsor_form = SponsorForm(self.request.form, config = self.config)
        payload = super(BarcampBaseHandler, self).render_context
        payload['sponsor_form'] = sponsor_form
        payload['view'] = self.barcamp_view
        payload['actions'] = self.actions
        return payload
