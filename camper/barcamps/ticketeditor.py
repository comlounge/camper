#encoding=utf8
from starflyer import Handler, redirect, asjson
from camper import BaseForm, db, BaseHandler
from camper import logged_in, is_admin, ensure_barcamp
from camper.handlers.forms import *
import werkzeug.exceptions
from wtforms import *
import wtforms.widgets
from sfext.babel import T
from .base import BarcampBaseHandler
from camper.handlers.forms import *
import uuid


class MultiCheckboxField(SelectMultipleField):
    widget = wtforms.widgets.ListWidget(prefix_label=False)
    option_widget = wtforms.widgets.CheckboxInput()


class TicketConfigurationForm(BaseForm):
    """form for configuring the tickets"""
    ticketmode_enabled  = BooleanField(T('Enable Ticketing'), 
            description=T(u"if you enable ticketing the normal registration process per event is replaced by acquiring tickets you define here"))
    paid_tickets        = BooleanField(T('Paid Tickets'), 
            description=T(u"Enable this option if you want to charge money for tickets. Please be aware though that barcamptools will not perform any payment processing. You have to do this yourself. You also need a proper imprint and contact email before you can enable this option."))
    preregistration     = BooleanField(T('Enable Pre-Registration'), 
            description=T(u'If enabled an administrator needs to confirm the ticket transaction. If you use paid tickets this is always active because you have to check the payments yourself.'))            


class TicketClassForm(BaseForm):
    """form for adding a new ticket class"""
    name                = TextField(T(u"Name of the ticket"), [validators.Length(max=300), validators.Required()])
    description         = TextAreaField(T(u"Description"), [validators.Length(max=10000)],
                description = T(u'Please describe here what you get for obtaining one of these tickets'),
    )
    size                = SelectField(T(u"maximum tickets available"), [validators.Required()], 
                                        choices = [(str(n),str(n)) for n in range(1, 500)])
    events              = MultiCheckboxField(T(u'Events'), description=T(u'Please select the events you can attend with this ticket'))
    price               = TextField(T(u"Price"), [validators.Length(max=10)])
    
    start_date          = DateField(T("start date"), [], format="%d.%m.%Y")
    end_date            = DateField(T("end date"), [], format="%d.%m.%Y")
    

class TicketEditor(BarcampBaseHandler):
    """shows the ticket editor and configuration screen"""

    template = "admin/ticketeditor.html"

    LOGGER = "ticketeditor"

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def get(self, slug = None):
        """render the view"""

        # collect the configuration
        ticket_config = {
            'ticketmode_enabled' : self.barcamp.ticketmode_enabled,
            'paid_tickets' : self.barcamp.paid_tickets,
            'preregistration' : self.barcamp.preregistration,
        }
        config_form = TicketConfigurationForm(self.request.form, config = self.config, **ticket_config)
        add_form = TicketClassForm(self.request.form, config = self.config)
        add_form.events.choices = [(e._id, e.name) for e in self.barcamp.eventlist]
        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            config_form = config_form,
            add_form = add_form,
            title = self.barcamp.name,
            **self.barcamp)

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def post(self, slug = None):
        """add a new ticket class"""
        add_form = TicketClassForm(self.request.form, config = self.config)
        add_form.events.choices = [(e._id, e.name) for e in self.barcamp.eventlist]
        if add_form.validate():
            f = add_form.data
            f['_id'] = unicode(uuid.uuid4())
            self.barcamp.ticket_classes.append(f)
            self.barcamp.put()
            self.log.trace("created new ticket class", cls = f)
            self.flash(self._('new ticket created'), category="info")
        else:
            print add_form.errors
            self.flash(self._('The form contains errors. Please correct them and try again.'), category="danger")
        return redirect(self.url_for("barcamps.admin_ticketeditor", slug = self.barcamp.slug))

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    def delete(self, slug = None):
        """delete a sponsor again and give the index via idx param"""
        idx = int(self.request.form['idx']) # index in list
        del self.barcamp.sponsors[idx]
        self.barcamp.put()
        return redirect(self.url_for("barcamps.index", slug = self.barcamp.slug))



class TicketingConfig(BarcampBaseHandler):
    """handler for toggling the ticketmode"""

    @logged_in()
    @is_admin()
    @ensure_barcamp()
    @asjson()
    def post(self, slug = None):
        """toggele the ticketmode"""
        bc = self.barcamp
        bc.ticketmode_enabled = self.request.form.get('ticketmode_enabled') == u"true"
        bc.preregistration = self.request.form.get('preregistration') == u"true"
        if self.request.form.get("paid_tickets", "") == "true" and bc.has_imprint and bc.contact_email:
                bc.paid_tickets = True
                bc.preregistration = True
        else:
            bc.paid_tickets = False

        bc.put()
        return {
            'ticketmode_enabled' : bc.ticketmode_enabled,
            'paid_tickets' : bc.paid_tickets,
            'preregistration' : bc.preregistration,
        }

