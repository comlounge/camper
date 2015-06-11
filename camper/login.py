from wtforms import Form, TextField, PasswordField, BooleanField, validators, SelectMultipleField, widgets
from userbase.handlers.forms import BaseForm
from sfext.babel import babel_module, T


class UsernameLoginForm(BaseForm):
    """our own username login form which derives from userbase BaseForm which in turn derives
    from the sf-babel BaseForm in case it is installed
    """

    username    = TextField('Username', [validators.Length(max=200), validators.Required()])
    password    = PasswordField('Passwort', [validators.Length(max=135), validators.Required()])
    remember    = BooleanField('eingeloggt bleiben')

class EMailLoginForm(BaseForm):
    """our own email login form which derives from userbase BaseForm which in turn derives
    from the sf-babel BaseForm in case it is installed
    """

    email    	= TextField(T('E-Mail'), [validators.Length(max=100), validators.Required()])
    password    = PasswordField(T('Password'), [validators.Length(max=135), validators.Required()])
    remember    = BooleanField(T('remember me'))

