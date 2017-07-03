const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
//init services

const LinkMap = require('./models/LinkMap.js');
const KnownPhishingUrl = require('./models/KnownPhishingUrl.js');

app.get('/v1/links/:linkId/redirect', function (req, res) {
  LinkMap.findOne({ _id: req.params.linkId }, function(err, map) {
  	if(map === null){
  		return res.status(404).send("");//error page?
  	}

  	res.redirect(map.targetURL);
  });
});

const linkReturnStatus = {
	BLACKLISTED:0
};

app.post('/v1/links', function (req, res) {
	
	//require this param
	if(req.body.targetUrl === undefined){
		return res.status(422).send();
	}

	//determine if this is a known phishing url
	KnownPhishingUrl.findOne({url:req.body.targetUrl}, function(err, result){

		if(result !== null){
			return res.status(422).send({error:linkReturnStatus});
		}

		LinkMap.findOne({ targetURL: req.body.targetUrl }, function(err, map) {
		  
		  if(map !== null){
		  	return res.send(map);
		  }

		  LinkMap.create({
		  	targetURL:req.body.targetUrl
		  })
		  .then(function(e){
		  	res.send(e);
		  }, function(err){
		  	console.log(err);
		  });

		});
	});

});

//----
//INIT----
//----
const mongoose = require('mongoose');
//init db
mongoose.connect('mongodb://db:27017/tmp', { 
	config: { 
		autoIndex: false 
	} 
})
//init phishTank
.then(function(s){
	return require('./services/phishTank/phishTank.js').init();
})
.then(function(){
	return app.listen(8080, function () {
	  console.log('App listening on port 8088!')
	});
})
.catch(function(e){
	console.log("Failed to start server. Exiting");
});

