from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from M3208Helper.settings import MEDIA_ROOT
import os
from django.utils.encoding import smart_str

from helper.models import Folder, File
from django.core import serializers
from django.views.decorators.http import require_http_methods


# Получить root папку и её потомков в первом поколении
@require_http_methods(["GET"])
def get_root(request):
    folder = Folder.objects.get(parent_folder=None)
    child_folders = Folder.objects.filter(parent_folder=folder)
    child_files = File.objects.filter(folder=folder)

    child_folders_serialize = serializers.serialize('json', child_folders)
    child_files_serialize = serializers.serialize('json', child_files)
    folder_serialize = serializers.serialize('json', [folder])

    data = {}
    data['child_folders'] = child_folders_serialize
    data['child_files'] = child_files_serialize
    data['folder'] = folder_serialize

    return JsonResponse(data)


# Получить потомков в первом поколении конкретно папки по id
@require_http_methods(["GET"])
def get_folder(request, id):
    folder = Folder.objects.get(id=id)
    child_folders = Folder.objects.filter(parent_folder=id)
    child_files = File.objects.filter(folder=id)

    child_folders_serialize = serializers.serialize('json', child_folders)
    child_files_serialize = serializers.serialize('json', child_files)
    folder_serialize = serializers.serialize('json', [folder])

    data = {}
    data['child_folders'] = child_folders_serialize
    data['child_files'] = child_files_serialize
    data['folder'] = folder_serialize

    return JsonResponse(data)


@require_http_methods(["POST"])
def append_folder(request):
    kwargs = request.GET
    try:
        folder = Folder(
            name=kwargs.get('name'),
            parent_folder=Folder.objects.get(id=int(kwargs.get('parent_folder')))
        )
        folder.save()
        status = "OK"
    except:
        status = "ERROR"

    return JsonResponse({'status': status})


@require_http_methods(["POST"])
def change_name_folder(request):
    try:
        new_name = request.GET.get('name')
        id = int(request.GET.get('id'))
        folder = Folder.objects.get(id=id)
        folder.name = new_name
        folder.save()
        status = "OK"
    except:
        status = "ERROR"

    return status


@require_http_methods(["POST"])
def simple_upload(request):
    status = "ERROR"
    if request.FILES['file_input']:
        try:
            file_input = request.FILES['file_input']
            name = request.GET.get('name')
            try:
                description = request.GET.get('description')
            except:
                description = ""
            file = File(
                name=name,
                file=file_input,
                description=description,
            )
            file.save()
            status = "OK"
        except:
            pass
    return JsonResponse({'status', status})

@require_http_methods(["GET"])
def download_file(request, path):
    file = File.objects.get(id=int(path))
    response = HttpResponse()
    response['Content-Type'] = ''
    response['Content-Disposition'] = "attachment; filename=" + file.name
    response['X-Sendfile'] = smart_str(os.path.join(MEDIA_ROOT, path))
    return response