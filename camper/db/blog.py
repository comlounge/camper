from mongogogo import *
import datetime
from camper.exceptions import *
import isodate
import pymongo
from camper.utils import string2filename

__all__=["BlogEntry", "BlogEntries"]


class BlogEntrySchema(Schema):
    """a blog entry schema"""
    created         = DateTime()
    updated         = DateTime()
    published		= DateTime() # publishing date to be shown
    created_by      = String() # TODO: should be ref to user
    workflow            = String(required = True, default = "draft")

    title           = String(required = True)
    slug 			= String(required = True)
    image           = String(required=False) # title image
    layout          = String() # name of layout
    content         = String()
    tags 			= List(String()) # list of tags (string)


    gallery         = String() # id of the gallery to use
    
    barcamp         = String() # or empty for homepage (for later)
    

class BlogEntry(Record):
    schema = BlogEntrySchema()
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'published'		: datetime.datetime.utcnow,
        'workflow'      : "draft",
        'title'         : "",
        'slug'          : "",
        'content'       : "",
        'layout'        : "default",
        'image'         : None
    }

    workflow_states = {
        'draft'       : ['published'],
        'published'   : ['draft'],
    }

    layouts = ['default', 'left', 'right']

    def set_layout(self, layout):
        if layout not in self.layouts:
            return
        self.layout = layout

    @property
    def has_image(self):
        """return whether a page has an image attached or not"""
        return self.image is not None and self.image!=""

class BlogEntries(Collection):
    
    data_class = BlogEntry

    def before_serialize(self, obj):
        obj['updated'] = datetime.datetime.utcnow()
        if not obj['slug']:
            # only create slug if it doesn't exist
            i = 1
            slug = original_slug = string2filename(obj['title'])
            while True:
                bcid = obj['barcamp']
                if self.find_one({'slug' : slug, 'barcamp' : unicode(bcid)}) is None:
                    break
                slug = original_slug+"_%s" %i
                i = i + 1
            obj['slug'] = slug

        return obj

    def by_slug(self, slug, barcamp = None):
        """return a page by only using the slug (and barcamp if given)"""
        if barcamp is None:
            return self.find_one({'slug' : slug, 'barcamp' : "___"})
        else:
            return self.find_one({'slug' : slug, 'barcamp' : unicode(barcamp._id)})

    def by_barcamp(self, barcamp, sort_by = "published", ascending = False, only_published = True, only_past = True):
        """return all blog entries for a barcamp sorted by date

        :param barcamp: barcamp object for which blog posts should be searched
        :param sort_by: which field to sort on, defaults to ``published``
        :param ascending: whether to sort ascending or descending, default to descending (False)
        :param only_published: if set to False will also return draft versions, defaults to True
        :param only_past: if ``True`` will only return already published posts, otherwise all, defaults to ``True``

        :returns: list of blog entries sorted according to arguments

        """
        n = datetime.datetime.now()
        q = {
            'barcamp' : unicode(barcamp._id)
        }
        if only_past:
            q['published'] = {'$lt' : n}
        if only_published:
            q['workflow'] = 'published'
        return self.find(q).sort(sort_by, pymongo.ASCENDING if ascending else pymongo.DESCENDING )

    def add(self, entry, barcamp = None):
        """adds a new blog entry"""
        if barcamp is not None:
            entry.barcamp = unicode(barcamp._id)
        else:
            raise ValueError, "you need to provide a barcamp"
        return self.put(entry)
