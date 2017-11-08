from django import forms

from .models import File


class FileUploadForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(FileUploadForm, self).__init__(*args, **kwargs)
        self.fields['files_upload'].widget.attrs['multiple'] = True

    files_upload = forms.FileField(required=True)

    class Meta:
        model = File
        fields = ['folder', 'files_upload']