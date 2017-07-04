#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Ensure that dependencies are installed
$(
	cd $DIR/ui/src;
	bower install;

	cd $DIR/ui;
	npm install

	gulp build
);