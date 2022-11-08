from rest_framework.viewsets import ModelViewSet
from author import models as author_models
from author import serializers as author_selial

class PersoneModelViewSet(ModelViewSet):
    queryset = author_models.PersoneModel.objects.all()
    serializer_class = author_selial.PersoneModelSerializer
###############################################################################

class ProjectModelViewSet(ModelViewSet):
    queryset = author_models.ProjectModel.objects.all()
    serializer_class = author_selial.ProjectModelSerilizer
###############################################################################

class TodoModelViewSet(ModelViewSet):
    queryset = author_models.TodoModel.objects.all()
    serializer_class = author_selial.TodoModelSerilizer
###############################################################################
