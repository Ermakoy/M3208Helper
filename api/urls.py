from django.conf.urls import url, include
from .views import JSONResponseFolderView, JSONAppendFolderView

urlpatterns = [
    url(r'^get-folder/(?P<id>\d+)/$', JSONResponseFolderView.as_view()),
    url(r'^get-root/$', JSONResponseFolderView.as_view()),
    url(r'^append-folder/$', JSONAppendFolderView.as_view()),
    # url(r'^change-folder-name', view=change_name_folder),
]