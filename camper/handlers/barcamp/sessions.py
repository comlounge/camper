#encoding=utf8
from starflyer import Handler, redirect
from camper import BaseForm, db, BaseHandler
import bson
from wtforms import *
from camper.handlers.forms import *
import werkzeug.exceptions

class SessionAddForm(BaseForm):
    title = TextField()
    description = TextAreaField()

class SessionList(BaseHandler):
    """shows a list of all the proposed sessions"""

    template = "barcamp/sessions.html"

    def get(self, slug = None):
        """return the list of sessions"""
        barcamp_id = self.barcamp._id
        sessions = self.config.dbs.sessions.find({'barcamp_id' : str(barcamp_id)})
        form = SessionAddForm(self.request.form)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['user_id'] = self.user._id
            f['barcamp_id'] = self.barcamp._id
            session = db.Session(f, collection = self.config.dbs.sessions)
            session = self.config.dbs.sessions.put(session)
            self.flash("Dein Sessionvorschlag wurde erfolgreich angelegt!")
            return redirect(self.request.url)
        return self.render(sessions = sessions, form = form, **self.barcamp)

    # TODO: Post should only work logged in!
    post = get
