import email
from django.contrib.auth.base_user import password_validation
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "make test users (1 root and 2 users)"


    def handle(self, *args, **options):

        PersoneModel = get_user_model() 

        # ToDo: add protect error if exists 

        # create root user
        PersoneModel.objects.create(
                username="root",
                email="root@root.root",
                password="toor",
                first_name="root",
                surname="rootoivch",
                is_superuser=True
                )
        # create common user
        for i in [1,2]:
            PersoneModel.objects.create(
                    username=f"user{i}",
                    email=f"user{i}@user.user",
                    password=f"user{i}",
                    first_name=f"USER{i}",
                    surname=f"Surname{i}",
                    is_superuser=False
                    )
        self.stdout.write("Creatde 3 user username:password ->" +
                          "\n\troot:toor\n\tuser1:user1\n\tuser2:user2")


