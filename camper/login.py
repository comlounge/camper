from wtforms import Form, TextField, PasswordField, BooleanField, validators, SelectMultipleField, widgets                                                                               
class UsernameLoginForm(Form):
    username    = TextField('Username', [validators.Length(max=200), validators.Required()])
    password    = PasswordField('Passwort', [validators.Length(max=135), validators.Required()])
    remember    = BooleanField('eingeloggt bleiben')

