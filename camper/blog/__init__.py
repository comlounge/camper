from starflyer import Module, URL

import add
import entries
import edit

class BlogModule(Module):
    """handles everything regarding blogposts"""

    name = "blog"

    routes = [
	    URL('/<slug>/blog', 			'entries',		  entries.ListView),
	    URL('/<slug>/blog/new', 		'add',            add.AddView),
	    URL('/<slug>/blog/<eid>', 		'edit',           edit.EditView),
	]

blog_module = BlogModule(__name__)

        