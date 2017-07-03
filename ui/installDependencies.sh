#!/usr/bin/env bash

# Install parent module dev dependencies
npm install

# Install dependencies for both portals
(cd ./AdminPortal/ && bower install)
(cd ./CustomerPortal/ && bower install)