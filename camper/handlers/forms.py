#encoding=utf8
import json 
import decimal

from camper import BaseForm

from wtforms import TextField, PasswordField, FieldList, BooleanField, IntegerField, DecimalField
from wtforms import SelectField, DateField, TextAreaField, HiddenField, FloatField, Field
from wtforms import validators as v
from wtforms.widgets import html_params

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
