#encoding=utf8

import copy
import json
from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler
from camper import utils
from camper.handlers.forms import *


class DesignForm(BaseForm):
    """form for design aspects of a barcamp"""
    logo                    = UploadField(T(u"Barcamp Logo"), description = T('The logo should be 1140px wide and not more than 400 px high'))
    background_image        = UploadField(T(u"Background-Image"), description=T("If given, this image is used as a background behind all your barcamp content"))
    fb_image                = UploadField(T(u"Image for Facebook"), description=T('This image is used when posting links to facebook. Best is 1200 x 630 but minimum it should be 600 x 315px'))
    #font                    = StringField(T(u"Font to use"), default='"Helvetica Neue", "Helvetica", "Arial", sans-serif')
    link_color              = ColorField(T(u"Link Color"), default='#333')
    header_color            = ColorField(T(u"Header Background Color"), default='#fcfcfa')
    text_color              = ColorField(T(u"Text Color"), default='#333')
    background_color        = ColorField(T(u"Background Color"), default='#f0f019')

    navbar_link_color       = ColorField(T(u"Navbar Link Color"), default='#888')
    navbar_active_color     = ColorField(T(u"Navbar Active Link Color"), default='#f8f8f8')
    navbar_border_color     = ColorField(T(u"Navbar Border Color"), default='#b0b0b0')
    navbar_hover_bg         = ColorField(T(u"Navbar Hover Background Color"), default='#d0d0d0')
    navbar_active_bg        = ColorField(T(u"Navbar Active Background Color"), default='#333')

    hide_tabs               = MultiCheckboxField(T(u'Hide Navigation Tabs'), description=T(u'Select here which barcamp tabs not to show'),
                                choices=[
                                    ('sessions', T('Session Proposals')),
                                    ('events', T('Events')),
                                    ('blog', T('Blog')),
                                ]
                              )

    gallery                 = SelectField(T(u'Gallery to show on homepage'), 
                                    description = T('The gallery will be displayed on the homepage of your barcamp between barcamp navigation and the rest of the content'), 
                                    default = -1)



class DesignView(BarcampBaseHandler):
    """handle screen for handling design"""

    template = "admin/design.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """show the form"""
        form = DesignForm(self.request.form, obj = self.barcamp, config = self.config)

        # get the gallery choices
        galleries = self.config.dbs.galleries.by_barcamp(self.barcamp)
        choices = [(str(g._id), g.title) for g in galleries ]
        choices.insert(0, ("-1", self._('do not show a gallery')))
        form.gallery.choices = choices

        if self.request.method == "POST" and form.validate():
            f = form.data
            self.barcamp.update(f)
            self.barcamp.save()
        return self.render(form = form)

    post = get

        
