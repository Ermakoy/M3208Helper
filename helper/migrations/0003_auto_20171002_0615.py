# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-02 06:15
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('helper', '0002_auto_20170927_1307'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='date_creation',
            field=models.DateField(default=datetime.datetime(2017, 10, 2, 6, 15, 48, 736265), verbose_name='Дата создания'),
        ),
        migrations.AddField(
            model_name='file',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='folder',
            name='date_creation',
            field=models.DateField(default=datetime.datetime(2017, 10, 2, 6, 15, 48, 735672), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='folder',
            name='parent_folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='child_folders', to='helper.Folder'),
        ),
    ]