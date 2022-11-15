from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command

from author import models as author_models

class Command(BaseCommand):
    help = "full ths database a test data"


    def handle(self, *args, **options) -> None:
        try:
            self.stdout.write("WARNING: this command delete all" +
                              " date from persone project todot tabbles")
            self.stdout.write("print YES if you sure.")
            answer = input("Sure(default no): ")
            if answer == "YES":
                self.stdout.write("delete all date from tables")

                for table in [
                        author_models.TodoModel, 
                        author_models.ProjectModel, 
                        author_models.PersoneModel]:
                    table.objects.all().delete()
                call_command("loaddata", "0001_persone")
                call_command("loaddata", "0002_project")
                call_command("loaddata", "0003_todo")
            elif answer == "" or answer.lower() == "no":
                self.stdout.write("OK")
        except CommandError as djerror:
            self.stderr.write(str(djerror))
