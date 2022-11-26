from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from djangorestframework_camel_case.render import (BrowsableAPIRenderer,
                                                   CamelCaseJSONRenderer)
from rest_framework import mixins, pagination, status
from rest_framework.generics import ListAPIView
from rest_framework.pagination import (LimitOffsetPagination,
                                       PageNumberPagination)
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from author import filters as author_filters
from author import models as author_models
from author import serializers as author_selial


class PersoneModelViewSet(mixins.ListModelMixin, 
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
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
    
    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = author_models.ProjectModel.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


###############################################################################

class TodoModelAPIView(APIView, LimitOffsetPagination):
    default_limit = 20

    renderer_classes = [
            CamelCaseJSONRenderer, 
            BrowsableAPIRenderer]
    queryset = author_models.TodoModel.objects.all()

    def get(self, request, pk=None, format=None):
        if pk:
            todo = get_object_or_404(author_models.TodoModel, pk=pk)
            ser = author_selial.TodoModelSerilizer(
                    todo, 
                    many=False
                    )

            return Response(ser.data)

        todo_list = author_models.TodoModel.objects.all()
        req = self.request.query_params
        project_index = req.get("project")
        # filter by project
        if project_index:
            todo_list = todo_list.filter(project=int(project_index))
        todo_page = self.paginate_queryset(
                todo_list, 
                self.request,
                view=self
                )
        ser = author_selial.TodoModelSerilizer(
                instance=todo_page,
                many=True
                )
        response =  {
                "count": self.get_count(todo_list),
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": ser.data
                }
        return Response( response, 200)

    def put(self, request, pk=None, format=None):
        data:dict = self.request.data
        if data:
            obj = get_object_or_404(
                    author_models.TodoModel, 
                    pk=data["pk"]
                    )
            ser = author_selial.TodoModelSerilizer(obj, data=data)
            if ser.is_valid():
                ser.save()
                return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, pk=None, format=None):
        ser = author_selial.TodoModelSerilizer(data=request.data)
        if ser.is_valid(raise_exception=True):
            ser.save()
            return Response(ser.data, status= status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None, format=None):
        if pk:
            todo = get_object_or_404(author_models.TodoModel, pk=pk)
            todo.active = False
            todo.save(update_fields=["active"])
            ser = author_selial.TodoModelSerilizer(todo, many=False)
            return Response(ser.data)
        return Response(status=status.HTTP_404_NOT_FOUND)
###############################################################################
