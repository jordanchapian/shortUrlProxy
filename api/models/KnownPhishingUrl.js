const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KnownPhishingUrl = new Schema({
	url:  {
		type: String
	}
  	//info for tracking (date, requester... etc)
});

module.exports = mongoose.model('KnownPhishingUrl', KnownPhishingUrl);