# Camper - Barcamp-Tools

## Requirements

* Python 2.7
* virtualenv
* MongoDB
* Etherpad Lite with admin access

For development (esp. JS/CSS):

* node.js

## Installation

### Create a virtual environment

```shell
virtualenv .
sh bin/activate
```

### Clone camper into a directory inside, e.g. camper/

```
git clone <git@github.com:comlounge/camper.git> camper
```

### Develop camper

```shell
cd camper/
python setup.py develop
cd ..
```

### Copy example config files into the venv root

```shell
cp -r camper/contrib/etc .
```

* Don't forget to adjust settings, like mongodb host/port or location of image files.

* Also go to mapbox.com and create an API key and a map key.

* Also make sure you have dev.localhost assigned to 127.0.0.1 in /etc/hosts so that cookies can be saved (localhost does not work on many browsers).

### Create a user and give it the admin role::

```shell
bin/um -f etc/scripts.ini add <username> <email> <password>
bin/um -f etc/scripts.ini permissions <username> admin,userbase:admin
```

### Start the development server

```shell
bin/paster serve etc/camper.ini
```

If you do development you might want to add a ``--reload`` at the end.
