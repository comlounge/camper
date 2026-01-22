# -*- coding: utf-8 -*-

import pytest
import re
from conftest import lre_string
import urlparse
import time

# this is an integration suite

def test_user_registration_full(app, client):
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    html = resp.data.decode('utf-8')

    # Parse captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12  # fallback

    # Extract captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    # Wait to avoid time-based spam detection (min 2 seconds)
    time.sleep(2.5)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar99@example.org',
        'fullname'  : 'Mr. Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data)
    assert "please check your email" in str(app.last_handler.session['_flashes'])
    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    assert u'Deinen Account zu aktivieren' in mail.last_msg_txt
    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)
    assert "Your account has been successfully activated" in str(app.last_handler.session['_flashes'])


def test_user_send_activation_code_again(app, client):

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    html = resp.data.decode('utf-8')

    # Parse captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12

    # Extract captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    time.sleep(2.5)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data)

    # ask for a new activation code
    resp = client.get("/users/activation_code")
    assert "Please enter the email address you registered with to receive a new activation code" in resp.data

    resp = client.post("/users/activation_code", data = {'email' : 'foobar@example.org'})
    assert "A new activation code has been sent out, please check your email" in str(app.last_handler.session['_flashes'])

    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    assert "um Deinen Account zu aktivieren" in mail.last_msg_txt

    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)


def test_user_no_login_without_activation(app, client):

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")
    html = resp.data.decode('utf-8')

    # Parse captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12

    # Extract captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    time.sleep(2.5)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data, follow_redirects=True)

    # try to login
    resp = client.post("/users/login", data = {'email' : 'foobar@example.org', 'password' : 'password1'})
    assert "Your user account has not been activated" in resp.data

def test_user_login(app, client):

    # create a user
    mail = app.module_map['mail']
    resp = client.get("/users/register")

    html = resp.data.decode('utf-8')

    # Parse captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12

    # Extract captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    time.sleep(2.5)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data)

    # activate
    link = re.search(lre_string, mail.last_msg_txt).groups()[0]
    parts = urlparse.urlsplit(link)
    url = "%s?%s" %(parts.path, parts.query)
    resp = client.get(url)

    # login
    resp = client.post("/users/login", data = {'email' : 'foobar@example.org', 'password' : 'password1'})
    assert "Welcome, Mr. Foo Bar" in str(app.last_handler.session['_flashes'])


def test_no_same_email(app, client):
    mail = app.module_map['mail']

    # First registration - get captcha
    resp = client.get("/users/register")
    html = resp.data.decode('utf-8')

    # Parse captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12

    # Extract captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    # Wait to avoid time-based spam detection
    time.sleep(2.5)

    post_data = {
        'username'  : 'user1',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data)

    # Second registration - get new captcha
    resp = client.get("/users/register")
    html = resp.data.decode('utf-8')

    # Parse new captcha question and calculate answer
    match = re.search(r'Was ist (\d+)\+(\d+)', html)
    if match:
        answer = int(match.group(1)) + int(match.group(2))
    else:
        answer = 12

    # Extract new captcha_id
    captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
    captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

    # Wait again to avoid time-based spam detection
    time.sleep(2.5)

    post_data = {
        'username'  : 'user2',
        'password'  : 'password1',
        'password2' : 'password1',
        'email'     : 'foobar@example.org',
        'fullname'  : 'Mr. Neu Foo Bar',
        'captcha'   : str(answer),
        'captcha_id': captcha_id,
    }
    resp = client.post("/users/register", data = post_data)
    html = resp.data.decode('utf-8')
    assert "this email address is already" in html

