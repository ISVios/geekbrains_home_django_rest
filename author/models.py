from django.db import models

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _

class CharFieldCaseIgnore(models.CharField):
    """
    ignorecase CharField
    """
    def to_python(self, value):
        value = super().to_python(value)
        if isinstance(value, str):
            return value.lower()
        return value

class PersoneModel(AbstractBaseUser, PermissionsMixin):
    """
    django model for validators
    """
    username_validator = ASCIIUsernameValidator()

    username = CharFieldCaseIgnore(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_("Required. 150 characters or fewer.\
                    Letters, digits and @/./+/-/_ only."),
        validators=[username_validator],
        error_messages={
            "unique":_("A user with that username exists.")
        }
    )

    first_name = models.CharField(
        _("first name"),
        max_length=150,
        blank=True
    )

    surname = models.CharField(
        _("surname"),
        max_length=150,
        blank=True,
        null=True
    )

    age = models.DateField(
        _("age"),
        blank=True,
        null=True
    )

    email = CharFieldCaseIgnore(
        _("email"),
        max_length=256,
        unique=True,
        error_messages={
            "unique":_("A user with that email address allready exists")
        }
    )

    date_joined = models.DateTimeField(
        _("joing"),
        auto_now_add=True,
        editable=False
    )

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        If exists.
        """
        if self.first_name and self.surname:
            full_name = f"{self.first_name:s} {self.surname:s}"
            return full_name.strip()
        return ""

    def get_short_name(self):
        """Return the short name for the user if exists."""
        return (self.first_name if self.first_name else "")

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
###############################################################################

class ProjectModel(models.Model):
    """
    Project
    """
    class Meta:
        verbose_name = _("project")
        verbose_name_plural = _("projects")

    name = models.CharField(
            max_length=256,
            verbose_name="project name"
            )

    persones = models.ManyToManyField(PersoneModel)

    repo_url = models.CharField(
            blank=True,
            null=True,
            max_length=1024,
            verbose_name="repo_url"
            )

    create = models.DateTimeField(
            auto_now=True,
            verbose_name="created"
            )

    update = models.DateTimeField(
            auto_now_add=True,
            editable=False,
            verbose_name="updated"
            )

    deleted = models.BooleanField(
            default=False,
            editable=False,
            verbose_name="deleted"
            )

    def __str__(self):
        return f"Project {self.name}"
###############################################################################

class TodoModel(models.Model):

    content = models.TextField(
            blank=False,
            null = False
            )
    #Todo: change to model.Do_Nothong
    project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE)

    #Todo: change to model.Do_Nothong
    user = models.ForeignKey(PersoneModel, on_delete=models.CASCADE)

    create = models.DateTimeField(
            auto_now_add=True,
            verbose_name="created"
            )
    update = models.DateTimeField(
            auto_now=True,
            verbose_name="update"
            )
    open = models.BooleanField(
            default=True
            )
    deleted = models.BooleanField(
            default=False
            )
    def __str__(self):
        return f"Todo {self.pk}"
###############################################################################
