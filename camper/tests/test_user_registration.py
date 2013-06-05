# -*- coding: utf-8 -*-

import pytest
import re
from camper.app import lre_string
import urlparse

# this is an integration suite

def test_user_registration_full(app, client):
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
    }
    resp = client.post("/users/register", data = post_data)
    assert "Bitte checke Deine E-Mail" in str(app.last_handler.session['_flashes'])
    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    assert "um Deinen Account zu aktivieren" in mail.last_msg_txt
    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)
    assert "Dein Account wurde erfolgreich aktiviert" in str(app.last_handler.session['_flashes'])


def test_user_send_activation_code_again(app, client):  

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
    }
    resp = client.post("/users/register", data = post_data)

    # ask for a new activation code
    resp = client.get("/users/activation_code")
    assert "damit wir Dir einen neuen Code zusenden können" in resp.data

    resp = client.post("/users/activation_code", data = {'email' : 'foobar@example.org'})
    assert "neuen Aktivierungscode an Deine E-Mail gesendet" in str(app.last_handler.session['_flashes'])

    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    assert "um Deinen Account zu aktivieren" in mail.last_msg_txt

    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)


def test_user_no_login_without_activation(app, client):  

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
    }
    resp = client.post("/users/register", data = post_data, follow_redirects=True)

    # try to login
    resp = client.post("/users/login", data = {'username' : 'user1', 'password' : 'password1'})
    assert "Dein Account wurde noch nicht aktiviert" in resp.data

def test_user_login(app, client):  

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
    }
    resp = client.post("/users/register", data = post_data)

    # activate
    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)

    # login
    resp = client.post("/users/login", data = {'username' : 'user1', 'password' : 'password1'})
    assert "Du bist jetzt eingeloggt" in str(app.last_handler.session['_flashes'])


def test_no_same_email(app, client):
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
    }
    resp = client.post("/users/register", data = post_data)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Neu Foo Bar',
    }
    resp = client.post("/users/register", data = post_data)
    assert "this email address is already" in resp.data

