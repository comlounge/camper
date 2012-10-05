# encoding=utf-8
import starflyer
from starflyer import redirect
import functools
import wtforms
import userbase
from xhtml2pdf import pisa

from wtforms.ext.i18n.form import Form


__all__ = ["BaseForm", "BaseHandler", "logged_in", "aspdf"]

class logged_in(object):
    """check if a valid user is present"""

    def __call__(self, method):
        """check user"""
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.user is None:
                self.flash('Please log in.', category="danger")
                return redirect(self.url_for("userbase.login", force_external=True))
            return method(self, *args, **kwargs)
        return wrapper

class aspdf(object):
    """converts a template to PDF"""

    def __call__(self, method):

        that = self

        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            html = method(self, *args, **kwargs)
            pdf = pisa.CreatePDF(html)
            self.response.headers['Content-Type'] = "application/pdf"
            #self.response.headers['Content-Disposition']="attachment; filename=\"test.pdf\""
            self.response.data = pdf.dest.getvalue()
        return wrapper


class BaseForm(Form):   
    """a form which also carries the config object"""

    LANGUAGES = ['de', 'en']
    
    def __init__(self, formdata=None, obj=None, prefix='', config=None, **kwargs):
        super(BaseForm, self).__init__(formdata=formdata, obj=obj, prefix=prefix, **kwargs)
        self.config = config

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
        super(BaseHandler, self).before()

    @property
    def render_context(self):
        """provide more information to the render method"""
        payload = dict(
            wf_map = self.wf_map,
            user = self.user,
            #txt = self.config.i18n.de,
            title = self.config.title,
            description = self.config.description,
            vpath = self.config.virtual_path,
            vhost = self.config.virtual_host,
        )
        return payload

