# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-08 18:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_system', '0007_auto_20171108_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='files', verbose_name='Файл'),
        ),
    ]