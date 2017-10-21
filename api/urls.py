from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^get-folder/$', view=get_folder),
    url(r'^get-root$', view=get_root),
    url(r'^append-folder', view=append_folder),
    url(r'^change-folder-name', view=change_name_folder),
    url(r'^media/(?P<path>[\w\-\.]+)$', view=download_file)
]