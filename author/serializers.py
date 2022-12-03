from rest_framework.serializers import ModelSerializer
from author import models as author_models


class PersoneModelSerializer(ModelSerializer):
    class Meta:
        model = author_models.PersoneModel
        fields = ["pk", "username", "first_name", "surname", "email"]


class PersoneModelSerializerVer2(ModelSerializer):
    class Meta:
        model = author_models.PersoneModel
        fields = [
            "pk",
            "username",
            "first_name",
            "surname",
            "email",
            "is_staff",
            "is_superuser",
        ]


class ProjectModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.ProjectModel
        fields = ["pk", "name", "repo_url", "persones"]


class TodoModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.TodoModel
        fields = ["pk", "content", "project", "persone", "active"]
