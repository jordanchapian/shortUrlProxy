const KnownPhishingUrl = require('../../models/KnownPhishingUrl.js');

module.exports = {
	init:function(){
		
		return new Promise(function(resolve, reject){

			KnownPhishingUrl.remove({}, function(err, result){
					
				if(err){
					console.log('Failed to remove phishing urls');
					return reject();
				}

				//log successful result
				console.log('Removed ' + result.result.n + ' Phishing URLs');

				//map the data file
				//TODO: this should be a polling job most likely
				var phishingUrls = require('./verified_online.json').map(function(e){
					return {
						url:e.url
					};
				});

				//insert the mapped data
				KnownPhishingUrl.collection.insertMany(phishingUrls, function(err,r) {
					if(err){
						console.log('failed to insert phishing urls');
						return reject();
					}

					console.log('Inserted ' + r.insertedCount + ' Phishing URLs');
					return resolve();
				});
			});
		});

	}
};