from django.db import models


class Folder(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название папки")
    parent_folder = models.ForeignKey('Folder', blank=True, null=True, related_name='folder')

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название файла")
    folder = models.ForeignKey('Folder', related_name='files')
    file = models.FileField(upload_to="uploads/")

    def __str__(self):
        return self.name