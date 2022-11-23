from django.contrib import admin

from author.models import PersoneModel, ProjectModel, TodoModel


@admin.register(PersoneModel)
class PersoneModelAdmin(admin.ModelAdmin):
    pass

@admin.register(ProjectModel)
class ProjectModelAdmin(admin.ModelAdmin):
    pass


@admin.register(TodoModel)
class TodoModelAdmin(admin.ModelAdmin):
    pass
