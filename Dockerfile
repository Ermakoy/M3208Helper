FROM python:3.5
MAINTAINER Matt Bentley <mbentley@mbentley.net>

RUN (apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential git python python-dev python-setuptools nginx sqlite3 supervisor libpq-dev )

# pillow
RUN apt-get install -y libjpeg62-turbo-dev libtiff5-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk

RUN (easy_install pip &&\
  pip install uwsgi)

ADD . /opt/django/
VOLUME ["/opt/django"]
RUN (pip install --upgrade pip)
RUN (pip install -r /opt/django/requirements.txt)


RUN (echo "daemon off;" >> /etc/nginx/nginx.conf &&\
  rm /etc/nginx/sites-enabled/default &&\
  ln -s /opt/django/server_settings/nginx_django.conf /etc/nginx/sites-enabled/ &&\
  ln -s /opt/django/server_settings/supervisord.conf /etc/supervisor/conf.d/)


EXPOSE 8080
CMD ["/opt/django/server_settings/run.sh"]


