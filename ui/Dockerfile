FROM library/nginx:1.11.10
RUN apt-get update && apt-get upgrade -y --no-install-recommends && apt-get clean

COPY ./nginx.conf /etc/nginx/conf.d/default.conf