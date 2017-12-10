from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveAPIView
from rest_framework.mixins import (
    RetrieveModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
)

from rest_framework.permissions import IsAuthenticated

from .serializers import InFolderSerializer
from storage.models import Folder, File


@method_decorator(csrf_exempt, name='dispatch')
class RootFolderAPIView(RetrieveAPIView):
    queryset = Folder.objects.all()
    serializer_class = InFolderSerializer
    # permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.queryset.get(parent_folder=None)


@method_decorator(csrf_exempt, name='dispatch')
class FolderAPIView(RetrieveAPIView, UpdateModelMixin, CreateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Folder.objects.all()
    serializer_class = InFolderSerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
         return self.update(request, *args, **kwargs)

    # def delete(self, request, *args, **kwargs):
    #     return self.delete(request, *args, **kwargs)



















# class JSONDetailView(JSONResponseMixin, BaseDetailView):
#     def get(self, request, *args, **kwargs):
#         return self.render_to_response(*args, **kwargs)
#
#     def render_to_response(self, *args, **response_kwargs):
#         return self.render_to_json_response(*args, **response_kwargs)
#
#
# class JSONResponseFolderView(JSONDetailView):
#     def get(self, *args, **kwargs):
#         try:
#             folder = Folder.objects.get(id=int(kwargs['id']))
#         except:
#             folder = Folder.objects.get(parent_folder=None)
#
#         child_folders = Folder.objects.filter(parent_folder=folder.id)
#         child_files = File.objects.filter(folder=folder)
#
#         child_folders_serialize = serializers.serialize('json', child_folders)
#         child_files_serialize = serializers.serialize('json', child_files)
#         folder_serialize = serializers.serialize('json', [folder])
#
#         data = dict()
#         data['child_folders'] = child_folders_serialize
#         data['child_files'] = child_files_serialize
#         data['folder'] = folder_serialize
#
#         return self.render_to_response(*args, **data)
#
# @method_decorator(csrf_exempt, name='dispatch')
# class CreateFolderAPIView(CreateAPIView):
#     serializer_class = CreateFolderSerializer
#     permission_classes = (IsAuthenticated,)
