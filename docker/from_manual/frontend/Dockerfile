FROM nginx	

RUN apt-get update && apt-get install -y curl vim

RUN rm /etc/nginx/conf.d/default.conf
COPY ./frontend/ /root/
COPY ./docker/from_manual/frontend/entrypoint.sh /
COPY ./docker/from_manual/frontend/nginx.conf  /etc/nginx/nginx.conf

WORKDIR /root/
ENTRYPOINT /entrypoint.sh

