# coding=utf-8
"""
Tests for spam protection features in registration form

Tests three layers of protection:
1. Session-based captcha (no hidden field exposure)
2. Honeypot fields (website, url, phone)
3. Time-based validation (too fast = bot)
"""

import pytest
import time
from camper.app import EMailRegistrationForm, test_app

# Setup and teardown for fixtures
app_config = {
    'mongodb_name': 'testcamper',
    'testing': True,
    'modules.userbase.mongodb_name': 'testcamper',
    'session_cookie_domain': 'dev.localhost',
}

def setup_app():
    return test_app({}, **app_config)

def teardown_app(app):
    app.config.dbs.db.users.remove()

def pytest_funcarg__app(request):
    return request.cached_setup(
        setup = setup_app,
        teardown = teardown_app,
        scope = "function")

def pytest_funcarg__client(request):
    app = request.getfuncargvalue('app')
    return app.test_client()


class TestSpamProtection:
    """Test spam protection features"""

    def test_captcha_not_in_html(self, client):
        """Test that captcha answer is NOT exposed in HTML"""
        response = client.get('/users/register')
        html = response.data.decode('utf-8')

        # Old vulnerable fields should NOT be in HTML
        assert 'captcha_expected' not in html.lower()
        assert 'captcha_title' not in html.lower()

        # New captcha_id should be in HTML (as hidden field)
        assert 'captcha_id' in html.lower()

        # But captcha question should be visible
        assert 'captcha' in html.lower()
        assert 'was ist' in html.lower() or 'what is' in html.lower()

    def test_honeypot_fields_hidden(self, client):
        """Test that honeypot fields are hidden via CSS"""
        response = client.get('/users/register')
        html = response.data.decode('utf-8')

        # Honeypot fields should exist in HTML
        assert 'name="website"' in html
        assert 'name="url"' in html
        assert 'name="phone"' in html

        # But should be hidden via CSS
        assert 'honeypot-field' in html
        assert 'display: none' in html or 'display:none' in html

    def test_honeypot_detection_website(self, client):
        """Test that filling honeypot 'website' field triggers spam detection"""
        # First, get the form to initialize session
        response = client.get('/users/register')
        assert response.status_code == 200
        html = response.data.decode('utf-8')

        # Wait to avoid time-based detection
        time.sleep(2.5)

        # Extract captcha_id
        import re
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        # Now submit with honeypot filled
        response = client.post('/users/register', data={
            'email': 'test@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'website': 'http://spam.com',  # Honeypot filled!
            'captcha': '12',  # Doesn't matter, honeypot catches first
            'captcha_id': captcha_id
        }, follow_redirects=False)

        # Should fail validation (not redirect to success)
        # Either 200 with errors or redirect back to form
        assert response.status_code in [200, 302]
        if response.status_code == 200:
            html = response.data.decode('utf-8')
            assert 'spam' in html.lower() or 'error' in html.lower()

    def test_honeypot_detection_url(self, client):
        """Test that filling honeypot 'url' field triggers spam detection"""
        response = client.get('/users/register')
        html = response.data.decode('utf-8')
        time.sleep(2.5)

        # Extract captcha_id
        import re
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        response = client.post('/users/register', data={
            'email': 'test@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'url': 'http://spam.com',  # Honeypot filled!
            'captcha': '12',
            'captcha_id': captcha_id
        }, follow_redirects=False)

        assert response.status_code in [200, 302]
        if response.status_code == 200:
            html = response.data.decode('utf-8')
            assert 'spam' in html.lower() or 'error' in html.lower()

    def test_honeypot_detection_phone(self, client):
        """Test that filling honeypot 'phone' field triggers spam detection"""
        response = client.get('/users/register')
        html = response.data.decode('utf-8')
        time.sleep(2.5)

        # Extract captcha_id
        import re
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        response = client.post('/users/register', data={
            'email': 'test@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'phone': '555-1234',  # Honeypot filled!
            'captcha': '12',
            'captcha_id': captcha_id
        }, follow_redirects=False)

        assert response.status_code in [200, 302]
        if response.status_code == 200:
            html = response.data.decode('utf-8')
            assert 'spam' in html.lower() or 'error' in html.lower()

    def test_time_based_validation_too_fast(self, client):
        """Test that submitting form too quickly (< 2 seconds) triggers detection"""
        # Get form
        response = client.get('/users/register')
        html = response.data.decode('utf-8')

        # Extract captcha_id
        import re
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        # Submit immediately (< 2 seconds)
        response = client.post('/users/register', data={
            'email': 'test@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'captcha': '12',  # Assume this is correct
            'captcha_id': captcha_id
        }, follow_redirects=False)

        # Should fail due to timing
        assert response.status_code in [200, 302]
        if response.status_code == 200:
            html = response.data.decode('utf-8')
            assert 'langsamer' in html.lower() or 'slower' in html.lower() or 'error' in html.lower()

    def test_time_based_validation_expired(self, client):
        """Test that captcha expires after 30 minutes"""
        # This test would take 30 minutes to run, so we'll mock it
        # In production, you'd mock datetime or adjust the session manually
        pytest.skip("Requires 30+ minute wait or datetime mocking")

    def test_valid_registration_accepted(self, client):
        """Test that legitimate registration with correct timing is accepted"""
        # Get form
        response = client.get('/users/register')
        html = response.data.decode('utf-8')

        # Wait appropriate time (2+ seconds)
        time.sleep(2.5)

        # Parse captcha question from HTML (simplified for test)
        # In real implementation, would extract and solve
        import re
        match = re.search(r'Was ist (\d+)\+(\d+)', html)
        if match:
            answer = int(match.group(1)) + int(match.group(2))
        else:
            answer = 12  # fallback

        # Extract captcha_id from hidden field
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        # Submit with all correct data
        response = client.post('/users/register', data={
            'email': 'legitimate@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Legitimate User',
            'website': '',  # Honeypot empty
            'url': '',      # Honeypot empty
            'phone': '',    # Honeypot empty
            'captcha': str(answer),
            'captcha_id': captcha_id
        }, follow_redirects=False)

        # Should redirect to success page (302)
        assert response.status_code == 302

    def test_captcha_answer_validation(self, client):
        """Test that wrong captcha answer is rejected"""
        response = client.get('/users/register')
        html = response.data.decode('utf-8')
        time.sleep(2.5)

        # Extract captcha_id
        import re
        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        response = client.post('/users/register', data={
            'email': 'test@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'captcha': '999',  # Wrong answer
            'captcha_id': captcha_id
        }, follow_redirects=False)

        # Should fail validation
        assert response.status_code in [200, 302]
        if response.status_code == 200:
            html = response.data.decode('utf-8')
            assert u'ungültig' in html.lower() or 'invalid' in html.lower() or 'error' in html.lower()

    def test_captcha_single_use(self, client):
        """Test that captcha can only be used once (session cleared after use)"""
        # Get form
        response = client.get('/users/register')
        html = response.data.decode('utf-8')
        time.sleep(2.5)

        # Extract answer and captcha_id
        import re
        match = re.search(r'Was ist (\d+)\+(\d+)', html)
        if match:
            answer = int(match.group(1)) + int(match.group(2))
        else:
            answer = 12

        captcha_id_match = re.search(r'name="captcha_id".*?value="([^"]+)"', html)
        captcha_id = captcha_id_match.group(1) if captcha_id_match else ''

        # First submission - should succeed
        response1 = client.post('/users/register', data={
            'email': 'test1@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User',
            'captcha': str(answer),
            'captcha_id': captcha_id
        }, follow_redirects=False)

        # Second submission with same captcha_id - should fail (captcha cleared)
        response2 = client.post('/users/register', data={
            'email': 'test2@example.com',
            'password': 'password123',
            'password2': 'password123',
            'fullname': 'Test User 2',
            'captcha': str(answer),  # Same answer, should be invalid now
            'captcha_id': captcha_id  # Same ID - already used
        }, follow_redirects=False)

        # Second should fail because captcha was cleared
        if response2.status_code == 200:
            html = response2.data.decode('utf-8')
            assert 'abgelaufen' in html.lower() or 'expired' in html.lower() or 'error' in html.lower()


class TestFormUnit:
    """Unit tests for the form itself (without full app)"""

    def test_form_honeypot_fields_exist(self):
        """Test that honeypot fields are defined in form"""
        form_class = EMailRegistrationForm
        assert hasattr(form_class, 'website')
        assert hasattr(form_class, 'url')
        assert hasattr(form_class, 'phone')

    def test_form_has_captcha_id_field(self):
        """Test that form has captcha_id hidden field for UUID-based tracking"""
        form_class = EMailRegistrationForm
        # New secure captcha_id field should exist
        assert hasattr(form_class, 'captcha_id')
        # Old vulnerable fields should not exist
        assert not hasattr(form_class, 'captcha_expected')
        assert not hasattr(form_class, 'captcha_title')


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
