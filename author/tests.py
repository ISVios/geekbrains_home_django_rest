import email
import json
from typing import Any
from django.contrib.auth import get_user_model
from django.core.wsgi import WSGIHandler
from django.test import TestCase
from django.test.client import WSGIRequest
from rest_framework import status
from rest_framework.test import (
    APIRequestFactory,
    force_authenticate,
    APIClient,
    APISimpleTestCase,
    APITestCase,
)
from mixer.backend.django import mixer
from django.contrib.auth.models import Group, User
from author import views as author_views
from author import models as author_models


class TestPesoneList(TestCase):
    def test_no_reg_user_get_list(self):
        api_factory = APIRequestFactory()
        request = api_factory.get("/api/persone/")
        view = author_views.ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_reg_user_get_list(self):
        api_factory = APIRequestFactory()
        request = api_factory.get("/api/persone/")
        s_user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin12345678",
            is_active=True,
        )
        force_authenticate(request, s_user)
        view = author_views.ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_reg_user_persone_detail(self):
        client = APIClient()
        admin = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin12345678",
            is_active=True,
        )
        client.login(username="admin", password="admin12345678")
        response: Any = client.get(f"/api/persone/{admin.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_create_project_no_reg_user(self):
        project = author_models.ProjectModel.objects.create(
            name="test_project", repo_url=""
        )
        client = APIClient()
        response: Any = client.put(f"/api/project/{project.id}/", {"name": "project"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_project_reg_user(self):
        project = author_models.ProjectModel.objects.create(
            name="test_project", repo_url=""
        )
        client = APIClient()
        admin = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin12345678",
            is_active=True,
        )
        client.login(username="admin", password="admin12345678")
        response: Any = client.put(
            f"/api/project/{project.id}/",
            {"name": "simple task", "repo_url": "", "persones": [1]},
            "json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_update_project_reg_user_buldin(self):
        project = author_models.ProjectModel.objects.create(
            name="test_project", repo_url=""
        )
        admin = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin12345678",
            is_active=True,
        )
        self.client.login(username="admin", password="admin12345678")
        response: Any = self.client.put(
            f"/api/project/{project.id}/",
            '{"name": "simple task", "repo_url": "aaaaaaaa", "persones": [1]}',
            "application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        prj = author_models.ProjectModel.objects.get(id=project.id)
        self.assertEqual(prj.repo_url, "aaaaaaaa")

    def test_edit_mixer(self):
        project = mixer.blend(author_models.ProjectModel, repo_url="aaaaaaaa")
        admin = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin12345678",
            is_active=True,
        )
        self.client.login(username="admin", password="admin12345678")
        response = self.client.get(
            f"/api/project/{project.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = json.loads(response.content)
        self.assertEqual(project["repoUrl"], "aaaaaaaa")  # camelCase
