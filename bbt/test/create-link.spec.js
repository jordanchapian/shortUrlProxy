var request = require('request'),
	util = require('./util.js');

describe("URL Hash Creation", function() {

    it("should reject attempts to create a hash for a blacklisted url", function (done) {

    	request({
		  uri: util.buildAppUrl('/api/v1/links'),
		  method: 'POST',
		  json: {
		    "targetUrl":"http://www.potbotics.com/.index.php"
		  }
		}, function(err, result, body){
			expect(result.statusCode).toBe(422);
			done();
		});

    });

    it("should reject attempts to create a hash for a malformed url", function(){
    	// TODO
    });

    it("should return a hash for proper non-blacklisted urls", function(done){

    	request({
		  uri: util.buildAppUrl('/api/v1/links'),
		  method: 'POST',
		  json: {
		    "targetUrl":"http://www.google.com"
		  }
		}, function(err, result, body){
			expect(result.statusCode).toBe(200);
			done();
		});

    });

    it("should return the same hash for subsequent attempts to shorten the same url", function(done){
    	var requestConfig = {
		  uri: util.buildAppUrl('/api/v1/links'),
		  method: 'POST',
		  json: {
		    "targetUrl":"http://www.gmail.com"
		  }
		},
		foundHash;

    	request(requestConfig, function(err, result, body){
    		foundHash = body.shortUrl;

    		request(requestConfig, function(err, result, body){
    			expect(body.shortUrl).toBe(foundHash);
    			done();
    		});
			
		});
    });

});
