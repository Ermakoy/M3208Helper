#!/bin/bash

# set -e

# MODULE=${MODULE:-website}

# sed -i "s#module=website.wsgi:application#module=${MODULE}.wsgi:application#g" /opt/django/uwsgi.ini

# if [ ! -f "/opt/django/manage.py" ]
# then
#   echo "creating basic django project (module: ${MODULE})"
#  django-admin.py startproject ${MODULE} /opt/django/app/
#fi
pip install -r /opt/django/requirements.txt
/opt/django/manage.py migrate
/opt/django/manage.py collectstatic --noinput
exec /usr/bin/supervisord
