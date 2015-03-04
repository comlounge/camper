from starflyer import Module, URL

import admin

class BlogModule(Module):
    """handles everything regarding blogposts"""

    name = "blog"

    routes = [
	    URL('/<slug>/blog/new', 		'add',            admin.AddView),
	]

blog_module = BlogModule(__name__)

        