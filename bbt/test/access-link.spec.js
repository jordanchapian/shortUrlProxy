var request = require('request'),
	util = require('./util.js');

describe("URL Hash Proxy", function() {

    it("should redirect unknown hashes to a 404", function (done) {
    	request({
		  uri: util.buildAppUrl('/someinvalidtoken'),
		  method: 'GET'
		}, function(err, result, body){
			expect(result.statusCode).toBe(404);
			done();
		});
    });

    it("should redirect known hashes to their respective locations", function(done){
        request({
            uri: util.buildAppUrl('/api/v1/links'),
            method: 'POST',
            json: {
                "targetUrl":"http://www.something.com"
            }
        }, function(err, result, body){

        	request({
				uri:util.buildAppUrl('/'+body.id),
				method:"GET"
			}, function(err, result, body){
                expect(result.request.uri.href).toBe('http://www.something.com/');
				done();
			});

        });
    });

});
