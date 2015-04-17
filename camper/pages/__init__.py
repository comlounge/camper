import add
import view
import images
import edit
import entries
from starflyer import Module, URL


class PagesModule(Module):
    """handles everything regarding pages (for barcamps and global)"""

    name = "pages"

    routes = [

    	# TODO: make global pages work again (really?)
        #URL('/admin/pages', "admin_pages", handlers.admin.pages.PagesView),
        #URL('/admin/pages/<slot>/add', 'admin_pages_add', pages.add.AddView),
        #URL('/s/<page_slug>', 'page', pages.view.View),

        # pages for barcamps
        URL('/<slug>/admin/pages', 			'barcamp_pages', 		entries.ListView),
        URL('/<slug>/page_add/<slot>', 		'barcamp_page_add', 	add.AddView),
        URL('/<slug>/slug_validate', 		'slug_validate', 		add.SlugValidate, defaults={'page_slug': None}),
        URL('/<slug>/<page_slug>/slug_validate', 		'slug_validate', 		add.SlugValidate),
        URL('/<slug>/<page_slug>', 			'barcamp_page', 		view.View),
        URL('/<slug>/<page_slug>/upload', 	'page_image_upload', 	images.ImageUpload),
        URL('/<slug>/<page_slug>/layout', 	'page_layout', 			edit.LayoutView),
        URL('/<slug>/<page_slug>/edit', 	'page_edit', 			edit.EditView),
        URL('/<slug>/<page_slug>/partial_edit', 'page_edit_partial', edit.PartialEditView),
        URL('/<slug>/<page_slug>/delete', 	'page_image_delete', 	images.ImageDelete),
        URL('/<slug>/<page_slug>/image', 	'page_image', 			images.Image),

    ]

pages_module = PagesModule(__name__)

