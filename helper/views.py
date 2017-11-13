from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import FileUploadForm
from .models import File


class IndexView(LoginRequiredMixin, TemplateView):
    template_name = "index.html"