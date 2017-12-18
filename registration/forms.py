from django import forms
from django.contrib.auth.models import User


class UserRegistrationForm(forms.ModelForm):
    password1 = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password1')

    def save(self, commit=True):
        self.instance.set_password(self.cleaned_data['password'])
        return super(UserRegistrationForm, self).save()
