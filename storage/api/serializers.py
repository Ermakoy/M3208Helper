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

    # def update_validation(self, instance, validated_data):
    #     if Folder.objects.get(id=instance.parent_folder_id).child_folders.all().get(name=validated_data['name']):
    #         raise ValidationError(detail="Папка с таикм именем уже сущесвует")
    #
    # def create_validation(self, validated_data):
    #
    #     try:
    #         parent_folder = Folder.objects.get(id=validated_data['parent_folder_id'])
    #     except:
    #         ValidationError(detail="Родительсксо папки не существует")
    #
    #     if Folder.objects.get(id=validated_data['parent_folder_id']).child_folders.all().get(name=validated_data['name']):
    #         raise ValidationError(detail="Папка с таиким именем уже сущесвует")

    # TODO: Валидаци данных про создание папки(Root и Одинаковые имена в папке)
    def create(self, validated_data):
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

