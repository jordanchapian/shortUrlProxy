#!/usr/bin/env bash

#Ensure package locations (base/stage)
mkdir /app;
mkdir /app/stage;

################
# BUILD UI
################
mkdir /app/stage/ui;
cp -r /app/ui/source/. /app/stage/ui;

# install bower components
cd /app/stage/ui/src
bower install

# build the app
cd /app/stage/ui/
rm -fr /app/ui/build/.
npm install
gulp build
cp -r ./build/. /app/ui/build

# Build the api dependencies
mkdir /app/stage/api
rm -fr /app/api/build/.
cp /app/api/source/package.json /app/stage/api;
cd /app/stage/api
npm install
npm install body-parser #TODO: Weird bug, installing body-parser (this is temp)
cp -r ./node_modules/. /app/api/build;