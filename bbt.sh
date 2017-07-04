#!/bin/sh

echo "Please enter the ip address of the docker host: "
read docker_host
export DEMO_APP_DOCKER_IP="$docker_host"
docker-compose run bbt