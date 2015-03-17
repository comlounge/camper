from starflyer import Module, URL

import add
import entries
import edit
import view
import workflow

class BlogModule(Module):
    """handles everything regarding blogposts"""

    name = "blog"

    routes = [
        URL('/<slug>/blog/admin',       'entries',          entries.ListView),
        URL('/<slug>/blog/new',         'add',              add.AddView),
        URL('/<slug>/blog/<eid>',       'edit',             edit.EditView),
        URL('/<slug>/blog/<eid>/wf',    'wf',               workflow.WorkflowView),
        URL('/<slug>/blog',             'view',             view.ListView),

    ]

blog_module = BlogModule(__name__)

        
