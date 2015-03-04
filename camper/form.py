from wtforms import *
from wtforms.widgets import *
import datetime

__all__ = ['ATextInput', 'MyDateField', 'ACheckboxInput', 'ATextArea']

class ATextInput(TextInput):
    """angular js aware text input widget"""
    def __call__(self, field, **kwargs):
        for key in list(kwargs):
            if key.startswith('ng_'):
                kwargs['ng-' + key[3:]] = kwargs.pop(key)
        return super(ATextInput, self).__call__(field, **kwargs)

class ACheckboxInput(CheckboxInput):
    """angular js aware checkbox widget"""
    def __call__(self, field, **kwargs):
        for key in list(kwargs):
            if key.startswith('ng_'):
                kwargs['ng-' + key[3:]] = kwargs.pop(key)
        return super(ACheckboxInput, self).__call__(field, **kwargs)

class ATextArea(TextArea):
    """angular js aware text area widget"""
    def __call__(self, field, **kwargs):
        for key in list(kwargs):
            if key.startswith('ng_'):
                kwargs['ng-' + key[3:]] = kwargs.pop(key)
        return super(ATextArea, self).__call__(field, **kwargs)



class MyDateField(DateTimeField):
    """
    Same as DateField, but accepts None as answer
    """

    def __init__(self, label=None, validators=None, format='%Y-%m-%d', **kwargs):
        super(MyDateField, self).__init__(label, validators, format, **kwargs)

    def process_formdata(self, valuelist):
        if valuelist:
            date_str = ' '.join(valuelist)
            if date_str == '':
                self.data = None
                return
            try:
                self.data = datetime.datetime.strptime(date_str, self.format).date()
            except ValueError:
                self.data = None
                raise ValueError(self.gettext('Not a valid date value'))
