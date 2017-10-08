from django.db import models

class Folder(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название папки")
    date_creation = models.DateField(auto_now=True, verbose_name="Дата создания")

    parent_folder = models.ForeignKey('Folder', blank=True, null=True, related_name='Child_folder')

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название файла")
    folder = models.ForeignKey('Folder', related_name='files')
    file = models.FileField()
    date_creation = models.DateField(auto_now=True, verbose_name="Дата создания")
    description = models.TextField(verbose_name="Описание", null=True, blank=True)

    def __str__(self):
        return self.name
