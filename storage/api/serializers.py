from rest_framework import serializers
from rest_framework.exceptions import ValidationError


from storage.models import Folder, File


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class InFolderSerializer(serializers.ModelSerializer):
    child_folders = FolderSerializer(many=True, required=False)
    files = FileSerializer(many=True, required=False)

    class Meta:
        model = Folder
        fields = '__all__'

    def create(self, validated_data):
        child_folders = Folder.objects.get(id=validated_data['parent_folder']).child_folders.all()
        if validated_data['name'] in [folder.name for folder in child_folders]:
            raise ValidationError

        instance = Folder(
            name=validated_data['name'],
            parent_folder=validated_data['parent_folder'],
        )
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.save()
        return instance

