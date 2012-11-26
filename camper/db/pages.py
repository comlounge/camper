from mongogogo import *
import datetime

class PageSchema(Schema):
    """a location described by name, lat and long"""
    created             = DateTime()
    updated             = DateTime()
    created_by          = String() # TODO: should be ref to user

    title = String(required=True)
    menu_title = String(required=True)
    slug = String(required=True)
    image = String(required=False) # asset id
    layout              = String() # name of layout
    content = String()

class Page(Record):
    schema = PageSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'title'         : "",
        'slug'          : "",
        'content'       : "",
        'layout'        : "default",
        'image'         : None
    }

class Pages(Collection):
    
    data_class = Page
