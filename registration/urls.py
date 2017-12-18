from django.urls import path


from .views import RegistrationView

urlpatterns = [
    path(r'', RegistrationView.as_view())
]