from re import error
import graphene
from graphql import GraphQLError
from graphene_django import DjangoObjectType
from graphql.pyutils import suggestion_list

from author import models as author_models


class PersoneType(DjangoObjectType):
    class Meta:
        model = author_models.PersoneModel
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = author_models.ProjectModel
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = author_models.TodoModel
        fields = "__all__"


class ErrorMessage(graphene.ObjectType):
    suggestion_alternative = graphene.List(graphene.String)
    error_message = graphene.String(required=True)


class CreateTodo(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        persone_id = graphene.Int(required=True)
        project_id = graphene.Int(required=True)

    todo = graphene.Field(TodoType)
    error_message = graphene.String(required=True)

    def mutate(self, info, content, persone_id, project_id):
        try:
            persone = author_models.PersoneModel.objects.get(pk=persone_id)
        except:
            return ErrorMessage(error_message=f"No found persone with id:{persone_id}")
        try:
            project = author_models.ProjectModel.objects.get(pk=project_id)
        except:
            return ErrorMessage(error_message=f"No found project with id:{project_id}")
            # no work. try make like in haskell Either (Left error | Right obj)
        todo = author_models.TodoModel()
        todo.content = content
        todo.project = project
        todo.persone = persone
        todo.save()
        return CreateTodo(todo=todo)


class Mutation(graphene.ObjectType):
    add_todo = CreateTodo.Field()


class Query(graphene.ObjectType):
    all_persone = graphene.List(PersoneType)
    all_project = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)

    def resolve_all_persone(self, info):
        return author_models.PersoneModel.objects.all()

    def resolve_all_project(self, info):
        return author_models.ProjectModel.objects.all()

    def resolve_all_todo(self, info):
        return author_models.TodoModel.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)
