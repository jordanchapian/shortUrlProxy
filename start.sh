#!/bin/sh

echo "Please enter the ip address of the docker host: "
read docker_host
export DEMO_APP_DOCKER_IP="$docker_host"
docker-compose up -d nginx

echo "\n\n--------";
echo "Server will be available at $docker_host:8088";
echo "--------\n\n";