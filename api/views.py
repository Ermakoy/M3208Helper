from django.shortcuts import HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.generic.detail import BaseDetailView
from django.core import serializers

from file_system.models import Folder, File
from .mixins import JSONResponseMixin, JSONLoginRequiredMixin


class JSONDetailView(JSONResponseMixin, BaseDetailView):
    def get(self, request, *args, **kwargs):
        return self.render_to_response(*args, **kwargs)

    def render_to_response(self, *args, **response_kwargs):
        return self.render_to_json_response(*args, **response_kwargs)


class JSONResponseFolderView(JSONDetailView):
    def get(self, *args, **kwargs):
        try:
            folder = Folder.objects.get(id=int(kwargs['id']))
        except:
            folder = Folder.objects.get(parent_folder=None)

        child_folders = Folder.objects.filter(parent_folder=folder.id)
        child_files = File.objects.filter(folder=folder)

        child_folders_serialize = serializers.serialize('json', child_folders)
        child_files_serialize = serializers.serialize('json', child_files)
        folder_serialize = serializers.serialize('json', [folder])

        data = dict()
        data['child_folders'] = child_folders_serialize
        data['child_files'] = child_files_serialize
        data['folder'] = folder_serialize

        return self.render_to_response(*args, **data)


class AppendFolderAPIView(JSONDetailView):
    def get(self, request, *args, **kwargs):
        kwargs = request.GET
        try:
            name = kwargs.get('name')
            parent_folder = Folder.objects.get(id=int(kwargs.get('parent_folder')))

            folder = Folder(
                name=name,
                parent_folder=parent_folder
            )
            folder.save()
        except:
            self.render_to_response(**{'status': 'error'})
        return self.render_to_response(**{'status': 'ok'})
