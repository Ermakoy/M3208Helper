from django.views.generic.base import TemplateView
from django.views.generic.edit import ProcessFormView, FormView

from .forms import FileUploadForm
from .models import File


class IndexView(FormView):
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
