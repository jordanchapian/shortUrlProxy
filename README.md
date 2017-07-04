# cisco - Short URL Proxy
Author: Jordan Chapian
Email: jordanchapian@gmail.com

## Setup

### Required Software

* Execution Environment: docker, docker-machine, docker-compose

### Getting Started
* Start all of the build scripts (build mounted named volumes) with the root shell script `./build.sh`
* Start the docker containers with the root shell script (this requires docker-machine to get the docker host ip) using `./start.sh`. The script will output the ip:port for the running nginx container.

## Design Notes

### Database
* Chosen DB was mongodb for fast hash lookup
* DB name/pass is not used for this project. Would prefer for use env vars, time permitting.

### API Notes
* Since we have an anonymous endpoint to generate a link, we should be rate limiting this resource
* Time permitting, `app.js` would be broken up into multiple files and a router would have been used.
* I bootstrap the db with a phishing dataset as a fallback for the api. I'd likely do this with a cluster init script rather than in the service's main runblock so we can easily horizontally scale this service. I would like to use the phishtank api directly or create another service that I could query outside of this service. I was getting limited by the phishtank api so I removed that.

### UI Notes
* The UI is not very complicated - I chose to follow the wizard pattern and built a small angular app with a single module. Note this does not follow AngularJs best practices - Without time constraints, we would have multiple modules and UT coverage along with all services/controllers.
* Internationalization for text resources is normal development practice not involved here
* A testing environment would be set up for UT
* A testing environment would be set up for BBT the ui image artifact

### Reverse-Proxy Notes
* The reverse proxy handles the routing logic between the different services, nothing more. 
* Security headers are not set (many csdl items can be fixed by setting iframe content protection and csp.)

### BBT
* I wrote a few regression tests that are run in the bbt target. These can be run by starting up the bbt container or by using the provided shell script `./bbt`.

## General Notes
* It is a bit strange that this repository does not produce an artifact - I would much rather 
separate the three microservices into their own projects and push images up to a registry on release.

