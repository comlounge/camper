#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin
from wtforms import *
from sfext.babel import T
from camper.handlers.forms import *
import werkzeug.exceptions
import requests
import copy
from sfext.uploader import AssetNotFound
from camper.base import LocationNotFound


__all__ = ['Action', 'SponsorForm', 'BarcampBaseHandler', 'LocationNotFound',  'GalleryView']


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

    @property
    def actions(self):
        """return the possible menu actions for a barcamp as well as a flag if it's active or not"""
        actions = []
        uf = self.url_for
        bc = self.barcamp
        # we need to check for barcamp as pages use this handler, too and pages can also be on the top level 
        if bc is not None:
            actions.append(Action('home', T("Home"), uf('barcamps.index', slug = self.barcamp.slug), self.action == 'home'))
            if "sessions" not in bc.hide_tabs:
                actions.append(Action('sessions', T("session proposals"), uf('barcamps.sessions', slug = bc.slug), self.action == 'sessions'))
            # only show events if we actually have any defined
            if bc.events and "events" not in bc.hide_tabs:
                actions.append(Action('events', T("events"), uf('barcamps.user_events', slug = bc.slug), self.action == 'events'))
            if bc.planning_pad_public or self.is_admin:
                actions.append(Action('planning', T("planning"), uf('barcamps.planning_pad', slug = bc.slug), self.action == 'planning'))
            if self.config.dbs.blog.by_barcamp(self.barcamp, only_published = True).count() > 0 and "blog" not in bc.hide_tabs:
                actions.append(Action('blog', T("Blog"), uf('blog.view', slug = bc.slug), self.action == 'blog'))
            for page in self.barcamp_view.pages_for("menu"):
                pid = "page_%s" %page._id
                actions.append(Action(pid, page.menu_title, uf('pages.barcamp_page', slug = bc.slug, page_slug = page.slug), self.action == pid))
            if bc.twitterwall:
                if True:
                    actions.append(Action('twitterwall', T("Twitterwall"), bc.twitterwall, self.action == 'twitterwall'))
                elif bc.twitterwall.find("tweetwally") != -1:
                    actions.append(Action('twitterwall', T("Twitterwall"), uf("barcamps.tweetwally", slug = bc.slug), self.action == 'twitterwall'))
                else:
                    actions.append(Action('twitterwall', T("Twitterwall"), bc.twitterwall, self.action == 'twitterwall'))
        return actions


    @property
    def progress(self):
        """return the progress in percent of the barcamp completeness"""
        bc = self.barcamp
        wc = bc.wizard_checked # stuff the admin does not want
        events = bc.eventlist

        # do we have rooms and times for at least 1 event?
        # also gather all the events which do not have rooms or times

        event_status = {}
        has_timetable = False
        for event in events:
            event_status[event._id] = {
                'rooms' : False,
                'timeslots' : False,
            }
            
            tt = event.get('timetable', {})
            rooms = tt.get('rooms', [])
            timeslots = tt.get('timeslots', [])

            if len(rooms) > 0:
                has_timetable = True
                event_status[event._id]['rooms'] = True

            if len(timeslots) > 0:
                has_timetable = True
                event_status[event._id]['timeslots'] = True

        has_event = len(events) != 0 or "has_event" in wc
        has_sponsor = len(bc.sponsors) != 0 or "has_sponsor" in wc
        has_logo = bc.logo != "" and bc.logo != None or "has_logo" in wc
        has_twitter = bc.twitter != "" or "has_twitter" in wc
        has_hashtag = bc.hashtag != "" or "has_hashtag" in wc
        has_facebook = bc.facebook != "" or "has_facebook" in wc
        has_seo = bc.seo_description != "" or "has_seo" in wc

        is_public = bc.workflow in ("public", "registration")
        is_active = bc.workflow == "registration"
        has_timetable = has_timetable or "has_timetable" in wc

        results = dict(
            has_event = has_event,
            has_sponsor = has_sponsor,
            has_logo = has_logo,
            has_twitter = has_twitter,
            has_hashtag = has_hashtag,
            has_facebook = has_facebook,
            has_seo = has_seo,

            is_public = is_public,
            is_active = is_active,
            has_timetable = has_timetable
        )

        # compute the progress

        full_points = len(results)
        has_points = len([x for x in results.values() if x]) # len of all trues
        percentage = int(float(has_points) / float(full_points) * 100)

        return percentage


    @property
    def render_context(self):
        """provide more information to the render method"""
        payload = super(BarcampBaseHandler, self).render_context
        payload['view'] = self.barcamp_view
        payload['barcamp_view'] = self.barcamp_view
        payload['actions'] = self.actions
        payload['complete'] = self.progress
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
        for i in self.gallery.get_images():
            try:
                asset = self.app.module_map.uploader.get(i.image)
                v = asset.variants[variant]
                url = self.app.url_for("asset", asset_id = v._id)
                new_image = copy.copy(i)
                new_image.tag = """<img src="%s" width="%s" height="%s" %s>""" %(
                    url,
                    v.metadata['width'],
                    v.metadata['height'],
                    amap)
                images.append(new_image)
            except AssetNotFound:
                # shouldn't really happen but what do I know?!?
                continue

        return images
