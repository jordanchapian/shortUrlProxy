#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# init the api dependencies
$(cd $DIR/api; npm install);

# init the ui dependencies
$(
	cd $DIR/ui/src;
	bower install;

	cd $DIR/ui;
	npm install

	gulp build
);

# build the images
docker-compose build