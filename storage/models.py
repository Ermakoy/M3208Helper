from django.db import models


class Folder(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название папки")
    parent_folder = models.ForeignKey(
        'Folder',
        blank=True,
        null=True,
        related_name='child_folders',
        on_delete=models.CASCADE,
        verbose_name="Родительская папка",
    )

    def __str__(self):
        return self.name


class File(models.Model):
    folder = models.ForeignKey(
        'Folder',
        related_name='files',
        on_delete=models.CASCADE,
        verbose_name="Родительская папка",
    )
    file = models.FileField(verbose_name="Файл", upload_to='files')

    def __str__(self):
        return self.file.name