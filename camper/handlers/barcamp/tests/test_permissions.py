

def test_barcamp_add_admin(bclient):
    """test adding a barcamp"""
    r = bclient.get("/barcamp1/permissions")
    lh = bclient.application.last_handler
    au = lh.barcamp.admin_users
    assert len(au) == 1
    assert au[0].email == "foo.bar@example.org"

    
