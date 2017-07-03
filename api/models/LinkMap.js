const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const LinkMap = new Schema({
	targetURL:  {
		type: String,
		unique: true
	},
	_id: {
		type: String,
		default: shortid.generate
	}
  	//info for tracking (date, requester... etc)
});

LinkMap.set('toJSON', { virtuals: true });
LinkMap.virtual('shortUrl').get(function() {  
    return 'http://'+process.env.DEMO_APP_DOCKER_IP + ':8088' + '/' + this._id;
});

module.exports = mongoose.model('LinkMap', LinkMap);