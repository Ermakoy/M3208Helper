from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^get-folder/(?P<id>\d+)$', JSONResponseFolderView.as_view()),
    url(r'^get-root$', JSONResponseFolderView.as_view()),
    url(r'^append-folder', view=append_folder),
    url(r'^change-folder-name', view=change_name_folder),
    url(r'^media/(?P<path>[\w\-]+)$', view=download_file)
]