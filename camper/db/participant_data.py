from mongogogo import *
import datetime
from camper.exceptions import *

__all__=["DataForm", "DataFormSchema", "DataForms"]


class DataFieldSchema(Schema):
    """a sub schema describing a data form"""
    name                = String(required=True)
    title               = String(required=True)
    description         = String()
    fieldtype           = String(required=True)
    required            = Boolean()


class DataFormSchema(Schema):
    """a sub schema describing a data form"""
    barcamp_id          = String(required=True)
    fields              = List(DataFieldSchema())


class DataForm(Record):
    """the actual data form"""

    schema = DataFormSchema()


class DataForms(Collection):

    data_class = DataForm


