#!/bin/sh

$(
	export DEMO_APP_DOCKER_IP="$(docker-machine ip default)"
	docker-compose up -d nginx
);

echo "\n\n--------";
echo "Server will be available at $(docker-machine ip default):8088";
echo "--------\n\n";