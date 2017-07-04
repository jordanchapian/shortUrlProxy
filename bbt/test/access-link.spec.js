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

    it("should redirect known hashes to their respective locations", function(){

    });

});
