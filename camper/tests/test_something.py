

def test_page_add(barcamp, app):
    """add a page to a barcamp"""
    page = app.config.dbs.pages({}, slug="test-page", title="Test Page", menu_title="Test Page")
    page = app.config.dbs.pages.add_to_slot("menu", page, barcamp = barcamp)
    page.save()

    # retrieve pages again
    pages = list(app.config.dbs.pages.for_slot("menu", barcamp=barcamp))
    assert len(pages)==1
    page = pages[0]
    assert page.title == "Test Page"

def test_page_delete(barcamp, app):
    """add a page to a barcamp"""
    page = app.config.dbs.pages({}, slug="test-page", title="Test Page", menu_title="Test Page")
    page = app.config.dbs.pages.add_to_slot("menu", page, barcamp = barcamp)
    page.save()

    # delete the page
    app.config.dbs.pages.remove_from_slot("menu", 0, barcamp = barcamp)

    # retrieve pages again
    pages = list(app.config.dbs.pages.for_slot("menu", barcamp=barcamp))
    assert len(pages)==0

