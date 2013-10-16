#coding: utf-8

import os
import pprint
from babel import support
from starflyer.scripts import ScriptBase
from camper import db


class SetDefaultMailTemplates(ScriptBase):
    """script to set the default mail templates to every barcamp which doesn't
       have them yet
    """
    locale = 'de'

    def __call__(self):
        barcamps = self.app.config.dbs.db.barcamps.find()
        for barcamp in barcamps:
            if not barcamp.has_key('mail_templates'):
                # create default mail templates
                url = self.app.url_for("barcamps.index", slug = barcamp['slug'], _full=True)
                templates = {}
                templates['welcome_text'] = self.render_lang("emails/default_welcome.txt", barcamp=barcamp, url=url)
                templates['welcome_subject'] = self._('Welcome to %s') %barcamp['name']
                templates['onwaitinglist_text'] = self.render_lang("emails/default_onwaitinglist.txt", barcamp=barcamp, url=url)
                templates['onwaitinglist_subject'] = self._("Unfortunately list of participants is already full. You have been put onto the waiting list and will be informed should you move on to the list of participants.")
                templates['fromwaitinglist_text'] = self.render_lang("emails/default_fromwaitinglist.txt", barcamp=barcamp, url=url)
                templates['fromwaitinglist_subject'] = self._("You are now on the list of participants for this barcamp.")
                barcamp.update({'mail_templates':templates})
                barcamp = db.Barcamp(barcamp, collection = self.app.config.dbs.barcamps)
                barcamp = self.app.config.dbs.barcamps.put(barcamp)

    def render_lang(self, tmplname=None, **kwargs):
        path, filename = os.path.split(tmplname)
        lpath = os.path.join(path, self.locale, filename)
        mpath = os.path.join("_m", 'barcamps', lpath)
        tmpl = self.app.jinja_env.get_or_select_template(mpath)
        return tmpl.render(**kwargs)

    def _(self, s):
        translations = self.app.module_map['babel'].catalogs.get(str(self.locale), support.Translations.load())
        return translations.ugettext(unicode(s))




def set_templates():
    s = SetDefaultMailTemplates()
    s()

if __name__=="__main__":
    set_templates()