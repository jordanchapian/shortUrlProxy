#!/usr/bin/env bash

#Remove created volumes
#Remove created images (other than dependencies)
docker images | grep shorturlproxy | awk '{print $1}' | xargs docker rmi
docker volume ls | grep shorturlproxy | awk '{print $2}' | xargs docker volume rm

