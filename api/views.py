from django.shortcuts import render
from django.http import JsonResponse

from helper.models import Folder, File
from django.core import serializers
from django.views.decorators.http import require_http_methods


# Получить root папку и её потомков в первом поколении
@require_http_methods(["GET"])
def get_root(request):
    folder = Folder.objects.get(parent_folder=None)
    folder_serialize = serializers.serialize('json', [folder])
    return JsonResponse({'folder': folder_serialize})


# Получить потомков в первом поколении конкретнйо папки по id
@require_http_methods(["GET"])
def get_folder(request, id):
    folder = Folder.objects.get(id=id)
    child_folders = Folder.objects.filter(parent_folder=id)
    child_files = File.objects.filter(folder=id)

    child_folders_serialize = serializers.serialize('json', child_folders)
    child_files_serialize = serializers.serialize('json', child_files)
    folder_serialize = serializers.serialize('json', [folder])

    data = {}
    data['child_foldres'] = child_folders_serialize
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


# @require_http_methods(["POST"])
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