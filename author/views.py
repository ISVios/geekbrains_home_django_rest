from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from author import models as author_models
from author import serializers as author_selial

from djangorestframework_camel_case.render import CamelCaseJSONRenderer,BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination

class PersoneModelViewSet(mixins.ListModelMixin, 
                          mixins.RetrieveModelMixin, 
                          GenericViewSet):
    renderer_classes = [CamelCaseJSONRenderer, BrowsableAPIRenderer]
    queryset = author_models.PersoneModel.objects.all()
    serializer_class = author_selial.PersoneModelSerializer
###############################################################################

class ProjectModelViewSet(ModelViewSet):

    class Pagger(LimitOffsetPagination):
        default_limit = 10

    renderer_class = CamelCaseJSONRenderer
    queryset = author_models.ProjectModel.objects.all()
    serializer_class = author_selial.ProjectModelSerilizer
    pagination_class = Pagger
###############################################################################

class TodoModelViewSet(ModelViewSet):

    class Pagger(LimitOffsetPagination):
        default_limit = 20

    renderer_class = CamelCaseJSONRenderer
    queryset = author_models.TodoModel.objects.all()
    serializer_class = author_selial.TodoModelSerilizer
    pagination_class = Pagger
###############################################################################
