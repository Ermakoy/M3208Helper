from django.shortcuts import HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.generic.detail import BaseDetailView
from django.core import serializers

from helper.models import Folder, File
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


class JSONAppendFolderView(JSONDetailView):
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


@require_http_methods(["POST"])
def change_name_folder(request):
    pass
    # try:
    #     new_name = request.GET.get('name')
    #     id = int(request.GET.get('id'))
    #     folder = Folder.objects.get(id=id)
    #     folder.name = new_name
    #     folder.save()
    #     status = "OK"
    # except:
    #     status = "ERROR"
    #
    # return status

#
# @require_http_methods(["POST"])
# def simple_upload(request):
#     status = "ERROR"
#     if request.FILES['file_input']:
#         try:
#             file_input = request.FILES['file_input']
#             name = request.GET.get('name')
#             try:
#                 description = request.GET.get('description')
#             except:
#                 description = ""
#             file = File(
#                 name=name,
#                 file=file_input,
#                 description=description,
#             )
#             file.save()
#             status = "OK"
#         except:
#             pass
#     return JsonResponse({'status', status})

@require_http_methods(["GET"])
def download_file(request, path):
    file = File.objects.get(id=int(path))

    with open(file.file.path, 'rb') as file_op:
        response = HttpResponse(file_op.read())
        response['Content-Disposition'] = "attachment; filename=" + file.name
        # response['X-Sendfile'] = smart_str(os.path.join(MEDIA_ROOT, path))
        return response