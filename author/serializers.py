from rest_framework.serializers import ModelSerializer
from author import models as author_models

class PersoneModelSerializer(ModelSerializer):
    class Meta:
        model = author_models.PersoneModel
        fields = ["username", "first_name", "surname", "email"]
###############################################################################

class ProjectModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.ProjectModel
        fields = ["name", "repo_url", "persones"]
###############################################################################

class TodoModelSerilizer(ModelSerializer):
    class Meta:
        model = author_models.TodoModel
        fields = ["content", "project", "persone"]
###############################################################################
