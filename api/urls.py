from django.conf.urls import url, include
from .views import JSONResponseFolderView, AppendFolderAPIView

urlpatterns = [
    url(r'^get-folder/(?P<id>\d+)/$', JSONResponseFolderView.as_view()),
    url(r'^get-root/$', JSONResponseFolderView.as_view()),
    url(r'^append-folder/$', AppendFolderAPIView.as_view()),
]