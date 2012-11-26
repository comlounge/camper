from camper.db import Page, Pages
    
def test_add_page_to_slot_and_create_it_for_homepage(pages):
    page = Page(
        title = u"Test Page 1",
        menu_title = u"TP 1",
        slug = u"test_page_1",
        content = u"Hello",
        )

    pages.add_to_slot("slot1", page)
    p = list(pages.for_slot("slot1"))
    assert len(p) == 1
    assert p[0].title == u"Test Page 1"
    assert p[0].index == 0
    assert p[0].slot == "slot1"

def test_add_multiple_pages_for_one_slot_on_homepage(pages):
    page1 = Page(
        title = u"Test Page 1",
        menu_title = u"TP 1",
        slug = u"test_page_1",
        content = u"Hello 1",
        )

    page2 = Page(
        title = u"Test Page 2",
        menu_title = u"TP 2",
        slug = u"test_page_2",
        content = u"Hello 2",
        )

    pages.add_to_slot("slot1", page1)
    pages.add_to_slot("slot1", page2)

    p = list(pages.for_slot("slot1"))
    assert len(p) == 2
    assert p[0].title == u"Test Page 1"
    assert p[0].index == 0
    assert p[0].slot == "slot1"

    assert p[1].title == u"Test Page 2"
    assert p[1].index == 1
    assert p[1].slot == "slot1"

def test_reorder_pages_for_one_slot_on_homepage(pages):
    page1 = Page(
        title = u"Test Page 1",
        menu_title = u"TP 1",
        slug = u"test_page_1",
        content = u"Hello 1",
        )

    page2 = Page(
        title = u"Test Page 2",
        menu_title = u"TP 2",
        slug = u"test_page_2",
        content = u"Hello 2",
        )

    pages.add_to_slot("slot1", page1)
    pages.add_to_slot("slot1", page2)

    pages.reorder_slot("slot1", [1,0])

    p = list(pages.for_slot("slot1"))
    assert len(p) == 2
    assert p[1].title == u"Test Page 1"
    assert p[1].index == 1
    assert p[1].slot == "slot1"

    assert p[0].title == u"Test Page 2"
    assert p[0].index == 0
    assert p[0].slot == "slot1"

def test_remove_page_for_homepage(pages):
    page1 = Page(
        title = u"Test Page 1",
        menu_title = u"TP 1",
        slug = u"test_page_1",
        content = u"Hello 1",
        )

    page2 = Page(
        title = u"Test Page 2",
        menu_title = u"TP 2",
        slug = u"test_page_2",
        content = u"Hello 2",
        )

    pages.add_to_slot("slot1", page1)
    pages.add_to_slot("slot1", page2)

    pages.remove_from_slot("slot1", 1)

    p = list(pages.for_slot("slot1"))
    assert len(p) == 1
    assert p[0].title == u"Test Page 1"
    assert p[0].index == 0
    assert p[0].slot == "slot1"
