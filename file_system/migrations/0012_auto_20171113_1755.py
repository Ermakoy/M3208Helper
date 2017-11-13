# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-13 17:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('file_system', '0011_auto_20171108_1902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent_folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='child_folder', to='file_system.Folder'),
        ),
    ]