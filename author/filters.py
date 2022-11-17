from django.db.models.expressions import fields
from django_filters import rest_framework as filters

from author import models as author_models

class ProjectModelFilter(filters.FilterSet):

    name = filters.CharFilter(lookup_expr='contains')
    class Meta:
        model = author_models.ProjectModel
        fields = ["name"]
