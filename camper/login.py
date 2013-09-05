from wtforms import Form, TextField, PasswordField, BooleanField, validators, SelectMultipleField, widgets
from userbase.handlers.forms import BaseForm

class UsernameLoginForm(BaseForm):
    """our own username login form which derives from userbase BaseForm which in turn derives
    from the sf-babel BaseForm in case it is installed
    """

    username    = TextField('Username', [validators.Length(max=200), validators.Required()])
    password    = PasswordField('Passwort', [validators.Length(max=135), validators.Required()])
    remember    = BooleanField('eingeloggt bleiben')

