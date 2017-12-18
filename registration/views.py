from django.views.generic.edit import CreateView


from .forms import UserRegistrationForm


class RegistrationView(CreateView):
    form_class = UserRegistrationForm
    template_name = 'registration/registration_form.html'
    success_url = '/'
