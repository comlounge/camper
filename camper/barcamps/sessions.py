#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler, ensure_barcamp, logged_in
import bson
from wtforms import *
from camper.handlers.forms import *
from .base import BarcampBaseHandler, is_admin
import werkzeug.exceptions
import datetime
import xlwt
from cStringIO import StringIO

class SessionAddForm(BaseForm):
    title = TextField()
    description = TextAreaField()

class SessionList(BarcampBaseHandler):
    """shows a list of all the proposed sessions"""

    template = "sessions.html"
    action = "sessions"

    def get(self, slug = None):
        """return the list of sessions"""
        barcamp_id = self.barcamp._id
        sort = self.request.args.get("sort", "date")
        so = 'vote_count' if sort=="votes" else "created"
        sessions = self.config.dbs.sessions.find({'barcamp_id' : str(barcamp_id)}).sort(so, -1)
        form = SessionAddForm(self.request.form)
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['user_id'] = self.user._id
            f['barcamp_id'] = self.barcamp._id
            session = db.Session(f, collection = self.config.dbs.sessions)
            session = self.config.dbs.sessions.put(session)
            self.flash("Dein Sessionvorschlag wurde erfolgreich angelegt!")
            return redirect(self.request.url)
        return self.render(sessions = sessions, sort = sort, form = form, view = self.barcamp_view, **self.barcamp)

    # TODO: Post should only work logged in!
    post = get

class Vote(BarcampBaseHandler):
    """vote for a session"""

    @ensure_barcamp()
    @logged_in()
    @asjson()
    def post(self, slug = None, sid = None):
        """vote for a session proposal"""
        sid = bson.ObjectId(sid)
        session = self.config.dbs.sessions.get(sid)
        if session.has_voted(self.user._id):
            count = session.unvote(self.user._id)
        else:
            count = session.vote(self.user._id)
        return {'status': 'ok', 'votes' : count, 'active' : session.has_voted(self.user._id)}

class SessionHandler(BarcampBaseHandler):
    """update and delete a session"""

    @ensure_barcamp()
    @logged_in()
    def post(self, slug = None, sid = None):
        """vote for a session proposal"""
        sid = bson.ObjectId(sid)
        session = self.config.dbs.sessions.get(sid)
        if not self.is_admin and not self.user_id == str(session.user._id):
            return {'status' : 'forbidden'}
        session.title = self.request.form['title']
        session.description = self.request.form['description']
        session.updated = datetime.datetime.now()
        session.save()
        return redirect(self.url_for(".sessions", slug = slug))

    @ensure_barcamp()
    @logged_in()
    @asjson()
    def delete(self, slug = None, sid = None):
        """vote for a session proposal"""
        sid = bson.ObjectId(sid)
        session = self.config.dbs.sessions.get(sid)
        if not self.is_admin and not self.user_id == str(session.user._id):
            return {'status' : 'forbidden'}
        session.remove()
        return {'status': 'success'}

class CommentHandler(BarcampBaseHandler):
    """create and delete session comments"""

    @ensure_barcamp()
    @logged_in()
    def post(self, slug = None, sid = None):
        """add a new comment to a session"""
        sid = bson.ObjectId(sid)
        session = self.config.dbs.sessions.get(sid)

        comment_text = self.request.form.get("comment","").strip()
        if comment_text != "":
            f = {
                'user_id' : self.user._id,
                'session_id' : str(sid),
                'comment' : comment_text,
            }
            comment = db.Comment(f, collection = self.config.dbs.sessions)
            comment = self.config.dbs.session_comments.put(comment)
            self.flash(self._("your comment has been added."))
        return redirect(self.url_for(".sessions", slug = slug))

    @ensure_barcamp()
    @logged_in()
    @asjson()
    @is_admin()
    def delete(self, slug = None, sid = None):
        """vote for a session proposal"""
        sid = bson.ObjectId(sid)
        session = self.config.dbs.sessions.get(sid)
        cid = self.request.form.get("cid", None)
        if cid is None:
            return {'status' : 'notfound'}
        cid = bson.ObjectId(cid)
        comment = self.config.dbs.session_comments.get(cid)
        comment.remove()
        return {'status': 'success'}

class SessionExport(BarcampBaseHandler):
    """export all the session proposals as excel"""

    def get(self, slug = None):
        """return the list of sessions"""
        filename = "%s-%s-sessions.xls" %(datetime.datetime.now().strftime("%y-%m-%d"), self.barcamp.slug)
        barcamp_id = self.barcamp._id
        sort = self.request.args.get("sort", "date")
        so = 'vote_count' if sort=="votes" else "created"
        sessions = self.config.dbs.sessions.find({'barcamp_id' : str(barcamp_id)}).sort(so, -1)

        # do the actual excel export
        wb = xlwt.Workbook()
        ws = wb.add_sheet('Teilnehmer')
        i = 1
        fieldnames = ['date', 'fullname', 'title', 'description', 'votes']

        # headlines
        c = 0
        for k in fieldnames:
            ws.write(0,c,k)
            c = c + 1

        # data
        for session in sessions:
            c = 0
            ws.write(i, 0, unicode(session.created.strftime("%d.%m.%Y")))
            ws.write(i, 1, unicode(session.user.fullname))
            ws.write(i, 2, unicode(session.title))
            ws.write(i, 3, unicode(session.description))
            ws.write(i, 4, unicode(session.vote_count))
            i = i + 1
        stream = StringIO()
        wb.save(stream)
        response = self.app.response_class(stream.getvalue(), content_type="application/excel")
        response.headers['Content-Disposition'] = 'attachment; filename="%s"' % filename
        return response
