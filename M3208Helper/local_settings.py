DATABASES = {
   "default": {
       "ENGINE": "django.db.backends.postgresql_psycopg2",
       "NAME": "m3208helper_db",
       "USER": "ermakoy",
       "PASSWORD": "superman",
       "HOST": "localhost",
       "POST": "",
   }
}


CACHEOPS_REDIS = {
    'host': 'localhost', # redis-server is on same machine
    'port': 6379, # default redis port
    'db': 2,             # SELECT non-default redis database
                         # using separate redis db or redis instance
                         # is highly recommended
    'socket_timeout': 3,   # connection timeout in seconds, optional
}
