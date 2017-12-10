from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin


from storage.views import IndexView

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'storage/', include('storage.urls')),
    path(r'', IndexView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
