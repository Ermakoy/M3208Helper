from django.shortcuts import render
from django.http import JsonResponse
from helper.models import Folder, File
from django.core import serializers


# Create your views here.
def get_root(request):
    folder = Folder.objects.get(parent_folder=None)
    folder_serialize = serializers.serialize('json', [folder])
    return JsonResponse({'folder': folder_serialize})


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

