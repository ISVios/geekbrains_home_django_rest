#!/bin/sh

while [ ! -d "/root/config/" ] ; do
	sleep 5s;
done


while [ true ] ; do
db_response=$(PGPASSWORD="postgres_toor" psql -h "db" -d "todo" -U "postgres_root" -c '\q')
	if [  -z $db_response ] ; then
		cd /root/
		poetry install --no-root
		poetry run python ./manage.py makemigrations
		poetry run python ./manage.py migrate
		poetry run python ./manage.py maketestdb -y
		poetry run python ./manage.py collectstatic
		break;
	fi
sleep 5s;
done



while [ true ] ; do
	poetry run gunicorn config.wsgi -b 0.0.0.0:8080
done
