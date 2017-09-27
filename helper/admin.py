from django.contrib import admin
from .models import *
class FolderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Folder._meta.fields]

class FileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in File._meta.fields]

admin.site.register(Folder, FolderAdmin)
admin.site.register(File, FileAdmin)