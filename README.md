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
source bin/activate
```

### Clone camper into a directory inside, e.g. camper/

```
git clone https://github.com/comlounge/camper.git camper
```

### Develop camper

```shell
cd camper/
python setup.py develop
cd ..
```

## Configuration

Copy example config files into the venv root

```shell
cp -r camper/contrib/etc .
```

Don't forget to adjust settings, like mongodb host/port or location of image files.

Also go to mapbox.com and create an API key and a map key.

For development make sure you have dev.localhost assigned to 127.0.0.1 in /etc/hosts so that cookies can be saved (localhost does not work on many browsers).

The file `config.ini` contains all the configuration variables, the file `dev.ini` is prepared for development. The file `scripts.ini` is the same as `dev.ini` but has debug switched off. This one is used for running scripts like the one below for creating a user. 

**Note:** you have to configure the mongodb endpoint twice, for the main app and for the userbase module as they do not share a database connection. 

## Hooking up nginx

In order to make run behind nginx in addition with an etherpad server you can use this configuration as a start:

```
server {

    listen 80;
    
    server_name mydomain;

    access_log /var/log/nginx/mydomain.access.log rt_cache;
    error_log /var/log/nginx/mydomain.error.log;

    add_header X-Proxy-Cache $upstream_cache_status;

    # we only use the pads here and route it to the etherpad lite instance
    # which runs on port 9999 in our case
    location /_pads/ {

        proxy_pass             http://127.0.0.1:9999/;
        proxy_set_header       Host $host;
        proxy_pass_header Server;

        # be carefull, this line doesn't override any proxy_buffering on set in a conf.d/file.conf
        proxy_buffering off;
        proxy_set_header X-Real-IP $remote_addr;  # http://wiki.nginx.org/HttpProxyModule
        proxy_set_header X-Forwarded-For $remote_addr; # EP logs to show the actual remote IP
        proxy_set_header X-Forwarded-Proto $scheme; # for EP to set secure cookie flag when https is used
        proxy_set_header Host $host;  # pass the host header
        proxy_http_version 1.1;  # recommended with keepalive connections

        # WebSocket proxying - from http://nginx.org/en/docs/http/websocket.html
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    # the camper instance runs on 9998
    location / {
        proxy_pass             http://127.0.0.1:9998/;
        proxy_set_header       Host $host;
        proxy_pass_header Server;

        # be carefull, this line doesn't override any proxy_buffering on set in a conf.d/file.conf
        proxy_buffering off;
        proxy_set_header X-Real-IP $remote_addr;  # http://wiki.nginx.org/HttpProxyModule
        proxy_set_header X-Forwarded-For $remote_addr; # EP logs to show the actual remote IP
        proxy_set_header X-Forwarded-Proto $scheme; # for EP to set secure cookie flag when https is used
        proxy_set_header Host $host;  # pass the host header                                                   
        proxy_set_header       X-Url-Scheme https;
        proxy_http_version 1.1;  # recommended with keepalive connections                                                    

        # WebSocket proxying - from http://nginx.org/en/docs/http/websocket.html
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}


map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

```



## Create a user and give it the admin role::

```shell
bin/um -f etc/scripts.ini add <username> <email> <password>
bin/um -f etc/scripts.ini permissions <username> admin,userbase:admin
```

## Start the development server

```shell
bin/paster serve etc/camper.ini
```

If you do development you might want to add a ``--reload`` at the end.
