from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^get-folder/(?P<id>\d+)$', view=get_folder),
    url(r'^get-root$', view=get_root),
    url(r'^append-folder', view=append_folder),
    url(r'^change-folder-name', view=change_name_folder)
]