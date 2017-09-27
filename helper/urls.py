from .views import get_html
from django.conf.urls import url, include

urlpatterns = [
    url(r'^get-html/$', view=get_html),
]