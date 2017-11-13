from django.views.generic.edit import FormView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import FileUploadForm
from .models import File


class IndexView(LoginRequiredMixin, FormView):
    template_name = "index.html"
    form_class = FileUploadForm
    success_url = '/'

    def form_valid(self, form):
        form_values = form.cleaned_data

        for file in self.request.FILES.getlist('files_upload'):
            file_obj = File(
                folder=form_values['folder'],
                file=file,
            )
            file_obj.name = file_obj.file.name
            file_obj.save()

        return super(IndexView, self).form_valid(form)
