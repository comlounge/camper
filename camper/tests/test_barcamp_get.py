import pytest
from camper import exceptions

def test_barcamp_get(barcamp, app):
    bc = app.get_barcamp("test")
    assert bc is not None

def test_barcamp_not_found(barcamp, app):
    pytest.raises(exceptions.BarcampNotFound, app.get_barcamp, "notfound")
