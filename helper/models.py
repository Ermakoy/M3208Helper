from django.db import models
from datetime import datetime


class Folder(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название папки")
    parent_folder = models.ForeignKey('Folder', blank=True, null=True, related_name='folder')
    date_creation = models.DateField(default=datetime.now(), verbose_name="Дата создания")

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название файла")
    folder = models.ForeignKey('Folder', related_name='files')
    file = models.FileField(upload_to="uploads/")
    date_creation = models.DateField(default=datetime.now(), verbose_name="Дата создания")
    description = models.TextField(verbose_name="Описание", null=True, blank=True)

    def __str__(self):
        return self.name