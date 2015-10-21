from wtforms import *
from wtforms.widgets import *
import datetime

__all__ = ['MyDateField']

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
                self.data = datetime.datetime.strptime(date_str, self.format)
            except ValueError:
                self.data = None
                raise ValueError(self.gettext('Not a valid date value'))
