from rest_framework.viewsets import ModelViewSet
from author import models as author_models
from author import serializers as author_selial

class PersoneModelViewSet(ModelViewSet):
    queryset = author_models.PersoneModel.objects.all()
    serializer_class = author_selial.PersoneModelSerializer
