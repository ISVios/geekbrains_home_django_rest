from rest_framework.serializers import ModelSerializer
from author import models as author_models

class PersoneModelSerializer(ModelSerializer):
    class Meta:
        model = author_models.PersoneModel
        fields = ["pk", "username", "first_name", "surname", "email"]
###############################################################################

class ProjectModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.ProjectModel
        fields = ["pk", "name", "repo_url", "persones"]
###############################################################################

class TodoModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.TodoModel
        fields = ["pk", "content", "project", "persone", "active"]
###############################################################################
