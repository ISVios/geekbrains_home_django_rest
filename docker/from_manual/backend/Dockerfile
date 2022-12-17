FROM python:3.10

COPY  . /root/
COPY ./docker/from_manual/backend/entrypoint.sh /

RUN apt-get update \ 
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev vim


RUN pip3 install -U pip
RUN curl -sSL https://install.python-poetry.org | python3 -
RUN ln -s /root/.local/bin/poetry /usr/bin/poetry

ENTRYPOINT /entrypoint.sh
