from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.core import serializers


from file_system.models import Folder, File


class JSONResponseMixin(object):

    def get_data(self, **kwargs):
        return kwargs

    def render_to_json_response(self, *args, **kwargs):
        return JsonResponse(
            self.get_data(**kwargs)
        )


class JSONLoginRequiredMixin(LoginRequiredMixin):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'status': 'error login required'})
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)


class GetFolderMixin(object):
    def get_data(self, **kwargs):

        try:
            folder = Folder.objects.get(id=kwargs['id'])
        except:
            folder = Folder.objects.get(parent_folder=None)

        child_folders = Folder.objects.filter(parent_folder=folder)
        child_files = File.objects.filter(folder=folder)

        child_folders_serialize = serializers.serialize('json', child_folders)
        child_files_serialize = serializers.serialize('json', child_files)
        folder_serialize = serializers.serialize('json', [folder])

        data = dict()
        data['child_folders'] = child_folders_serialize
        data['child_files'] = child_files_serialize
        data['folder'] = folder_serialize

        return data
