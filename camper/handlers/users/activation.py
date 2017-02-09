from starflyer import Handler, redirect                                                                                                                                      
from userbase import db
from camper.base import BaseHandler

from camper.services import RegistrationService, RegistrationError, TicketService, TicketError

__all__ = ['ActivationHandler']

class ActivationHandler(BaseHandler):
    """perform the activation process"""

    template = "_m/userbase/activation.html"

    def get(self):
        """show the registration form"""
        mod = self.app.module_map['userbase']
        cfg = mod.config

        code = self.request.args.get("code", None)
        if self.request.method == 'POST':
            code = self.request.form.get("code", "")
        else:
            code = self.request.args.get("code", None)
        if code is not None:
            user = mod.get_user_by_activation_code(code)
            if user is not None:
                user.activate()

                # log user in 
                mod.login(self, user=user, save = False)
                user.save()
                
                # default url to return to on activation
                url_for_params = cfg.urls.activation_success
                return_url = self.url_for(**url_for_params)
                
                # now register user for barcamps if some are give
                if "barcamp" in user.registered_for:
                    slug = user.registered_for['barcamp']
                    barcamp = self.config.dbs.barcamps.by_slug(slug)
                    if barcamp is None:
                        self.flash(self._("Unfortunately we couldn't find the barcamp you tried to register for. Please search for it on the homepage and register again"), category="danger")
                    else:
                        failed = False

                        # check for ticket mode
                        if barcamp.ticketmode_enabled:
                            ticketservice = TicketService(self, user, barcamp = barcamp)
                            for tc_id in user.registered_for.get('tickets', []):
                                try:
                                    status = ticketservice.register(tc_id, new_user = user)
                                except TicketError, e:
                                    self.log.error("an exception when registering a ticket occurred", error_msg = e.msg)
                                    failed = True

                        else:
                            reg = RegistrationService(self, user, barcamp = barcamp)
                            for eid in user.registered_for.get('eids', []):
                                event = barcamp.get_event(eid)
                                try:
                                    reg.set_status(eid, "going")
                                except RegistrationError, e:
                                    failed = True
                        if failed:
                            self.flash(self._("We could not register you for all selected events. Please check your email and the events page"), category="warning")
                        else:
                            self.flash(self._("Your account has been successfully activated and you have been registered for the barcamp") %user)
                        return_url = self.url_for("barcamps.index", slug = barcamp.slug)
                else:
                    self.flash(self._("Your account has been successfully activated.") %user)
                return redirect(return_url)
            else:
                url = self.url_for(endpoint="userbase.activation_code")
                params = {'url': url, 'code' : code}
                self.flash(self._("""The activation code is not valid. Please try again or click <a href="%(url)s">here</a> to get a new one.""") %params, category="danger")

        return self.render()

    post = get
