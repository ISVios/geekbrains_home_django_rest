from rest_framework.viewsets import ModelViewSet
from author import models as author_models
from author import serializers as author_selial

from djangorestframework_camel_case.render import CamelCaseJSONRenderer

class PersoneModelViewSet(ModelViewSet):
    renderer_class = CamelCaseJSONRenderer
    queryset = author_models.PersoneModel.objects.all()
    serializer_class = author_selial.PersoneModelSerializer
###############################################################################

class ProjectModelViewSet(ModelViewSet):
    renderer_class = CamelCaseJSONRenderer
    queryset = author_models.ProjectModel.objects.all()
    serializer_class = author_selial.ProjectModelSerilizer
###############################################################################

class TodoModelViewSet(ModelViewSet):
    renderer_class = CamelCaseJSONRenderer
    queryset = author_models.TodoModel.objects.all()
    serializer_class = author_selial.TodoModelSerilizer
###############################################################################
