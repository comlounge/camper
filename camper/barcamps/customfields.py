from starflyer import Handler, redirect, asjson, AttributeMapper
from camper import BaseForm, db, BaseHandler, is_admin, logged_in, ensure_barcamp
from wtforms import *
from sfext.babel import T
from .base import BarcampBaseHandler, LocationNotFound
import uuid


class ParticipantDataEditForm(BaseForm):
    """form for defining a pareticipant data form"""
    # base data
    title               = TextField(T("Name of field"), [validators.Length(max=50), validators.Required()],
                description = T('the name of the field to be shown in the form, e.g. "t-shirt size"'),
    )
    description         = TextAreaField(T("Description"),
                description = T('please describe what the user should enter in this field.'),
    )
    fieldtype           = RadioField(T("field type"), [validators.Required()], 
                choices=[
                    ('checkbox',T('a yes/no field')),
                    ('textfield',T('1 line of text')),
                    ('textarea',T('multiple lines of text'))],
                description = T('please chose between a one-line text field or multi-line text area'),
    )
    required            = BooleanField(T("field required?"),
                description = T('If you enable this then the user cannot register before this field has been filled in.'),
    )

class ParticipantsDataEditView(BarcampBaseHandler):
    """let the user define the participant data form fields"""

    template = "admin/participants_data_edit.html"

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def get(self, slug = None):
        """render the view"""
        form = ParticipantDataEditForm(self.request.form, config = self.config)
        registration_form = self.barcamp.registration_form
        if self.request.method == 'POST' and form.validate():
            f = form.data
            f['name'] = unicode(uuid.uuid4())
            self.barcamp.registration_form.append(f)
            self.barcamp.save()
            return redirect(self.url_for("barcamps.registration_form_editor", slug = self.barcamp.slug))

        return self.render(
            view = self.barcamp_view,
            barcamp = self.barcamp,
            title = self.barcamp.name,
            form = form,
            fields = self.barcamp.registration_form,
            **self.barcamp
        )

    post = get

    @ensure_barcamp()
    @logged_in()
    @is_admin()
    def delete(self, slug = None):
        """delete a form entry"""
        idx = self.request.args.get("idx", None)
        rf = self.barcamp.registration_form
        if idx is not None and int(idx) < len(rf) and int(idx) >= 0:
            del self.barcamp.registration_form[int(idx)]
            self.barcamp.save()
        return redirect(self.url_for("barcamps.registration_form_editor", slug = self.barcamp.slug))


