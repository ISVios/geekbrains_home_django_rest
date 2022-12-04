from django.db import models


class ProjectManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().all()


class TodoManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().all()
