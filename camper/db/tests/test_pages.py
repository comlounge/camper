from camper.db import Page, Pages
from camper.db import BarcampSchema, Barcamp
import datetime
    
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

def test_add_with_barcamps(pages, barcamps):
    barcamp1 = Barcamp(
        name = "Barcamp 1",
        description = "cool barcamp",
        slug = "barcamp",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    barcamp2 = Barcamp(
        name = "Barcamp 2",
        description = "cool barcamp",
        slug = "barcamp",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )

    barcamp1 = barcamps.save(barcamp1)
    barcamp2 = barcamps.save(barcamp2)

    page1 = Page(
        title = u"Test Page for BC 1",
        menu_title = u"BC TP 1",
        slug = u"test_page_1",
        content = u"Hello 1 for BC 1",
    )

    page2 = Page(
        title = u"Test Page 2 for BC 2",
        menu_title = u"BC TP 2",
        slug = u"test_page_2",
        content = u"Hello 2 for BC 2",
    )

    pages.add_to_slot("slot1", page1, barcamp = barcamp1)
    pages.add_to_slot("slot1", page2, barcamp = barcamp2)

    p = list(pages.for_slot("slot1"))
    assert len(p) == 0 # no barcamp given

    p = list(pages.for_slot("slot1", barcamp = barcamp1))
    assert len(p) == 1
    assert p[0].title == u"Test Page for BC 1"

    p = list(pages.for_slot("slot1", barcamp = barcamp2))
    assert len(p) == 1
    assert p[0].title == u"Test Page 2 for BC 2"
        

