# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-08 19:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helper', '0010_auto_20171108_1901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(upload_to='files', verbose_name='Файл'),
        ),
    ]
