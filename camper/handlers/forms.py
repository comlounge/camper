#encoding=utf8
import json
import decimal

from camper import BaseForm

from wtforms import TextField, PasswordField, FieldList, BooleanField, IntegerField, DecimalField
from wtforms import SelectField, DateField, TextAreaField, HiddenField, FloatField, Field, FormField, Form
from wtforms import validators as v
from wtforms.widgets import html_params, HTMLString
from jinja2 import Template

###
### CUSTOM WIDGETS etc.
###


def checkbox_button(field, **kwargs):
    """custom wtforms widget for the checkbox button toggle stuff"""
    kwargs.setdefault('type', 'checkbox')
    value = field.data
    field_id = kwargs.pop('id', field.id)
    button_id = "%s-%s" %(field_id, field_id)
    hidden_params = {
        'type' : 'hidden',
        'id' : field_id,
        'name' : field.name,
        'value' : "1" if value else "0"
    }
    button_params = {
        'id' : button_id,
        'for' : field_id,
    }
    if value:
        button_params['class'] = "btn btn-toggle active"
    else:
        button_params['class'] = "btn btn-toggle"
    if "class" in kwargs:
        button_params['class'] = button_params['class'] + " " + kwargs['class']

    html = [
        u'<input %s />' %html_params(**hidden_params),
        u'<button %s >' %html_params(**button_params)
    ]
    if value:
        html.append(u'<i class="icon icon-ok icon-nok"></i> ')
    else:
        html.append(u'<i class="icon icon-nok"></i> ')
    html.append(field.label.text)
    html.append(u"</button>")
    return u''.join(html)

class CurrencyField(DecimalField):
    """a currency field is a decimal field with additional options e.g. for internationalization

    We store it as float in python but we convert it to a string with the correct separator
    and decimals in the form.

    """

    def __init__(self, label=None, validators=None, places=2, rounding=None, separator=".", **kwargs):
        super(CurrencyField, self).__init__(label, validators, places, rounding, **kwargs)
        self.separator = ","

    def _value(self):
        """convert for the form"""
        v = super(CurrencyField, self)._value()
        return v.replace(".", self.separator)

    def process_formdata(self, valuelist):
        """process form data but keep in mind that the separator is not necessarily ."""
        if valuelist:
            try:
                data = valuelist[0].replace(self.separator, ".")
                self.data = decimal.Decimal(data)
            except ValueError:
                self.data = None
                raise ValueError(self.gettext(u'Not a valid currency value'))



class BooleanValueField(Field):
    """
    Represents an checkbox button
    """
    widget = checkbox_button

    def __init__(self, label=None, validators=None, **kwargs):
        super(BooleanValueField, self).__init__(label, validators, **kwargs)

    def process_data(self, value):
        self.data = bool(value)

    def process_formdata(self, valuelist):
        # Checkboxes and submit buttons simply do not send a value when
        # unchecked/not pressed. So the actual value="" doesn't matter for
        # purpose of determining .data, only whether one exists or not.
        self.data = valuelist[0] == u"1"

    def _value(self):
        if self.raw_data:
            return unicode(self.raw_data[0])
        else:
            return u'y'

class JSONField(Field):
    """a JSON field"""

    def _value(self):
        if self.data:
            return json.dumps(self.data)
        else:
            return u''

    def process_formdata(self, valuelist):
        if valuelist and len(valuelist)>0:
            self.data = json.loads(valuelist[0])
        else:
            self.data = u""


class UploadWidget(object):
    """
    Renders the upload widget which consists of a subform with the actual
    data and some html surrounding it.
    """

    tmpl = Template("""
        <div class="upload-widget"
                data-id="{{name}}"
                data-original-id="{{asset_id}}"
                data-preview-url="{{preview_url}}"
                data-delete-url="{{delete_url}}"
                data-upload-url="{{upload_url}}"
                data-postproc="{{postproc}}">
            {{hidden}}
            <div class="preview-area {{'show' if preview_url else 'hide'}}">
                <img src="{{preview_url}}">
            </div>
            <div class="upload-area show">
                <div class="">
                    <span class="uploadbutton btn-inline btn btn-primary">{{label}}</span>
                    <span class="deletebutton {{'hide' if not preview_url}} btn-inline btn btn-danger">{{delete_label}}</span>
                    <span class="revertbutton hide btn-inline btn btn-danger">{{revert_label}}</span>
                </div>
                <div class="progressbar progress progress-striped active hide">
                    <div class="bar" style="width: 0%%;"></div>
                </div>
                <div class="filenamebox hide">
                    File: <span class="upload-label-filename"></span>
                </div>
            </div>
        </div>
    """)
    html_params = staticmethod(html_params)

    def __call__(self, field, **kwargs):

        # create the hidden field with the asset_id
        kwargs.setdefault('id', field.id)
        kwargs.setdefault('type', "text")

        if 'value' not in kwargs:
            asset_id = kwargs['value'] = field._value()
        else:
            asset_id = kwargs['value']

        hidden = HTMLString('<input %s>' % self.html_params(name=field.name, type="hidden", id = field.id, value=asset_id))
        value = field.data
        kwargs.setdefault("label", "Upload")
        field_id = kwargs.pop('id', field.id)
        payload = {
            'preview_url'   : kwargs.get('preview_url',''),
            'upload_url'    : kwargs['upload_url'],
            'delete_url'    : kwargs.get('delete_url',''),
            'label'         : kwargs['label'],
            'delete_label'  : kwargs['delete_label'],
            'revert_label'  : kwargs['revert_label'],
            'value-filename' : '',
            'value-id'      : '',
            'name'          : field.name,
            'postproc'      : kwargs.get("postproc",""),
            'hidden'        : hidden,
        }
        return self.tmpl.render(**payload)


class UploadFieldOld(FormField):
    """an upload field for using the valums uploader"""

    widget = UploadWidget()

    def __init__(self, label=None, validators=None, separator='-', url=u'', **kwargs):

        class UploadForm(Form):
            """the hidden fields"""
            id = HiddenField()

            def process(self, formdata=None, obj=None, **kwargs):
                class D(object):
                    pass

                d = D()
                d.id = obj
                super(UploadForm, self).process(formdata, d, **kwargs)


            @property
            def data(self):
                """just return the value of the id field as the form data of this form instead of the full dict"""
                return self['id'].data

        super(UploadField, self).__init__(UploadForm, label, validators, separator, **kwargs)
        self.url = url

    def process_data(self, value):
        """process data into the form"""
        self.data = value
        return self.data

    def process_formdata(self, valuelist):
        """check the form data"""
        return None

    def _value(self):
        if self.data:
            return self.data
        else:
            return u''

class UploadField(Field):
    """an upload field for using the valums uploader."""

    widget = UploadWidget()

    def __init__(self, label=None, validators=None, uploader = None, app = None, **kwargs):
        super(UploadField, self).__init__(label, validators, **kwargs)
        self.uploader = uploader
        self.app = app

    def _value(self):
        """return the value necessary for the widget"""
        if self.data:
            return self.data
        else:
            return u''

