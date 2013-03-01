# -*- coding: utf-8 -*-
from camper import BaseForm, db, BaseHandler, logged_in, ensure_barcamp, is_admin
from .base import BarcampBaseHandler
from camper.db.barcamp import WorkflowError
from starflyer import redirect

class Permissions(BarcampBaseHandler):
    """screen for private/public and admin management"""

    template = "barcamp/permissions.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        return self.render(
            title = self.barcamp.name,
            **self.barcamp)

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """set the workflow state for the barcamp"""
        try:
            self.barcamp.set_workflow(self.request.form.get("wf",""))
            self.barcamp.save()
        except WorkflowError:
            self.flash(self._("you cannot perform this action."), category="error")
        if self.last_url:
            url = self.last_url
        else:
            url = self.url_for("barcamp", slug=slug)
        return redirect(url)


class Admin(BarcampBaseHandler):
    """add a new administrator.
    """

    template = "barcamp/permissions.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def post(self, slug = None):
        """set the visibility of the barcamp"""
        email = self.request.form.get("email")
        user = self.app.module_map.userbase.get_user_by_email(email)
        if user is None:
            self.flash("Ein Benutzer mit dieser E-Mail-Adresse wurde leider nicht gefunden.", category="error")
            return redirect(self.url_for("barcamp_permissions", slug = slug))

        uid = str(user._id)
        if uid not in self.barcamp.admins:
            self.barcamp.add_admin(user)
            self.barcamp.save()
            self.flash(u"%s ist nun ebenfalls ein Admin für dieses Barcamp." %user.fullname)

        return redirect(self.url_for("barcamp_permissions", slug = slug))

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        uid = self.request.args.get("uid")
        if uid == self.barcamp.created_by:
            self.flash(u"Dem Ersteller des Barcamps kann das Admin-Recht nicht entzogen werden.", category="error")
            return redirect(self.url_for("barcamp_permissions", slug = slug))
        if len(self.barcamp.admins)<2:
            self.flash(u"Es muss mindestens einen Administrator geben.", category="error")
            return redirect(self.url_for("barcamp_permissions", slug = slug))
        if uid in self.barcamp.admins:
            self.barcamp.remove_admin_by_id(uid)
            self.barcamp.save()
        self.flash(u"Administrator gelöscht.")
        return redirect(self.url_for("barcamp_permissions", slug = slug))
