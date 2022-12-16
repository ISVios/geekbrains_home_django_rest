from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command

from author import models as author_models


class Command(BaseCommand):
    help = "full ths database a test data"

    def add_arguments(self, parser):
        parser.add_argument(
            "-y",
            "--yes",
            action="store_true",
        )

    def drop_tables_data(self):
        for table in [
            author_models.TodoModel,
            author_models.ProjectModel,
            author_models.PersoneModel,
        ]:
            table.objects.all().delete()

    def full_database(self):
        for fixture in ["0001_persone", "0002_project", "0003_todo"]:
            call_command("loaddata", fixture)

    def handle(self, *args, **options) -> None:
        try:
            answer = "no"
            yes: bool = options["yes"]

            self.stdout.write(
                "WARNING: this command delete all"
                + " date from persone project todot tabbles"
            )
            self.stdout.write("print YES if you sure.")
            if yes:
                answer = "YES"
            else:
                answer = input("Sure(default no): ")

            if answer == "YES":
                self.stdout.write("delete all date from tables")
                self.drop_tables_data()
                self.full_database()
            elif answer == "" or answer.lower() == "no":
                self.stdout.write("OK")
        except CommandError as djerror:
            self.stderr.write(str(djerror))
