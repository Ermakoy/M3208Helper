from django.urls import include, path


from .views import IndexView


urlpatterns = [
    path('api/', include('storage.api.urls')),
]