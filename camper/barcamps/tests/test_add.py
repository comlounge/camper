

def test_barcamp_add_without_login(client):
    """test adding a barcamp"""
    resp  = client.post('/b/add', data=dict(
        name = "Barcamp 1",
        description = "this is barcamp 1",
        slug = "barcamp1",
        size = "10",
        start_date = "17.8.2012",
        end_date = "17.9.2012",
        location = "Aachen",

    ))
    assert resp.headers['Location'] == "http://example.org/users/login"
    assert resp.status_code == 302

def test_barcamp_add(logged_in_client):
    """test adding a barcamp"""
    resp  = logged_in_client.post('/b/add', data=dict(
        name = "Barcamp 1",
        description = "this is barcamp 1",
        slug = "barcamp1",
        size = "10",
        start_date = "17.8.2012",
        end_date = "17.9.2012",
        location = "Aachen",
    ))
    lh = logged_in_client.application.last_handler
    assert lh.get_flashes() == [u'Barcamp 1 has been created']
    
def test_barcamp_initialadmin(logged_in_client):
    """test adding a barcamp"""
    resp  = logged_in_client.post('/b/add', data=dict(
        name = "Barcamp 1",
        description = "this is barcamp 1",
        slug = "barcamp1",
        size = "10",
        start_date = "17.8.2012",
        end_date = "17.9.2012",
        location = "Aachen",

    ))
    app = logged_in_client.application
    u = app.module_map.userbase.get_user_by_email("foo.bar@example.org")
    b = app.config.dbs.barcamps.by_slug("barcamp1")
    assert b.admins[0] == str(u._id)

    
