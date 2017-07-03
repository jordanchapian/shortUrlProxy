# cisco - Short URL Proxy
Full dev cluster

## DB Notes
* Chosen DB was mongodb for fash hash lookup
* DB name/pass is hardcoded for this project. Would prefer for use env vars, time permitting.

## API Notes
* Since we have an anonymous endpoint to generate a link, we should be rate limiting this resource

### Phishing
* I bootstrap the db with a phishing dataset as a fallback for the api. I'd likely do this with a cluster init script rather than in the service's main runblock so we can easily horizontally scale this service. I would like to use the phishtank api directly or create another service that I could query outside of this service. I was getting limited by the phishtank api so I removed that.

TODO: 
* Move npm install to top level in shell script for "start"

## UI Notes

### Evaluating Tool Choice
The UI is not very complicated - I chose to follow the wizard pattern and built a small angular app with a single module. Note this does not follow AngularJs best practices - Without time constraints, we would have multiple modules and UT coverage along with all services/controllers.

TODO:
* Internationalization for text resources


## General Notes

* It is a bit strange that this repository does not produce an artifact - I would much rather 
separate the three microservices into their own projects and push images up to a registry on release.