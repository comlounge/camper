from mongogogo import *
import datetime

class PageError(Exception):
    """something was wrong with a page related class"""

    def __init__(self, msg):
        self.msg = msg

    def __repr__(self):
        return "<PageError: %s>" %msg

    def __str__(self):
        return "<PageError: %s>" %msg


class PageSchema(Schema):
    """a location described by name, lat and long"""
    created         = DateTime()
    updated         = DateTime()
    created_by      = String() # TODO: should be ref to user

    title           = String(required=True)
    menu_title      = String(required=True)
    slug            = String(required=True)
    image           = String(required=False) # asset id
    layout          = String() # name of layout
    content         = String()
    barcamp         = String() # or empty for homepage
    index           = Integer() # sequence number in list of pages
    slot            = String() # slot id of the page


class Page(Record):
    schema = PageSchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'title'         : "",
        'slug'          : "",
        'content'       : "",
        'layout'        : "default",
        'slot'          : "default",
        'index'         : 1,
        'layout'        : "default",
        'image'         : None
    }

    layouts = ['default', 'left', 'right']

    def set_layout(self, layout):
        if layout not in self.layouts:
            return
        self.layout = layout

class Pages(Collection):
    
    data_class = Page

    def reorder_slot(self, slot, indexes, barcamp = None):
        """reorders a slot. You give it the slot id in ``slot`` and the new sequence order in indexes in form of a list.

        Passing in [2,3,1] will reorder the existing pages in this order
        """
        pages = self.for_slot(slot, barcamp = barcamp)
        # do some checks
        if len(indexes) != pages.count():
            raise PageError("length of indexes (%s) does not match amount of pages (%s)" %(len(indexes), pages.count()))
           
        pages = list(pages)
        for page in pages:
            if page.index not in indexes:
                raise PageError("page with index %s missing in new indexes list" %(page.index))
            page.index = indexes.index(page.index)

        # finally save it
        for page in pages:
            page.put()

    def add_to_slot(self, slot, page, barcamp = None):
        """adds a new page into a slot at the end of it. You can give the page object without the slot set and it will do the rest"""
        page.slot = slot
        if barcamp is not None:
            page.barcamp = unicode(barcamp._id)
            page.index = self.find({'slot' : page.slot, 'barcamp' : unicode(barcamp._id)}).count()
        else:
            page.barcamp = "___"
            page.index = self.find({'slot' : page.slot, 'barcamp' : "___"}).count()
        return self.put(page)

    def by_slug(self, slug, barcamp = None):
        """return a page by only using the slug (and barcamp if given)"""
        if barcamp is None:
            return self.find_one({'slug' : slug, 'barcamp' : "___"})
        else:
            return self.find_one({'slug' : slug, 'barcamp' : unicode(barcamp._id)})

    def remove_from_slot(self, slot, index, barcamp=None):
        """removes a page at index ``index``"""
        if barcamp is None:
            page = self.find_one({'slot' : slot, 'index' : index, 'barcamp' : "___"})
        else:
            page = self.find_one({'slot' : slot, 'index' : index, 'barcamp' : unicode(barcamp._id)})
        self.remove({'_id' : page._id})

    def for_slot(self, slot, barcamp=None):
        """return all the pages for a slot"""
        if barcamp is None:
            return self.find({'slot' : slot, 'barcamp' : "___"}).sort("index", 1)
        else:
            return self.find({'slot' : slot, 'barcamp' : unicode(barcamp._id)}).sort("index", 1)



