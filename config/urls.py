"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from graphene_django.views import GraphQLView

from author import views as author_views

router = DefaultRouter()
router.register("persone", author_views.PersoneModelViewSet, "PersoneModel")
router.register("project", author_views.ProjectModelViewSet, "ProjectModel")

schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version="0.1",
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("getMe/", author_views.GetMeApi.as_view()),
    path("api-auth/", include("rest_framework.urls")),
    re_path(r"^api/(?P<version>v\d)\/", include(router.urls)),
    re_path("api/", include(router.urls)),
    path("api/todo/", author_views.TodoModelAPIView.as_view()),
    path("api/todo/<int:pk>", author_views.TodoModelAPIView.as_view()),
    path("api-token-auth/", views.obtain_auth_token),
    # docs
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
