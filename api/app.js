const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(require('./controllers/index.js'));

//use harmony promises for mongoose
mongoose.Promise = global.Promise;

// Create the database connection
//TODO: would be better to poll here
console.log('Waiting 5s for db to accept connections')
setTimeout(function(){
    mongoose.connect('mongodb://db:27017/tmp', {
        useMongoClient: true
    });
}, 3000);


mongoose.connection.once('connected', function () {
    console.log('mongoose connected');
    require('./services/phishTank/phishTank.js').init()
	.then(function(e){
		return app.listen(8080, function () {
			console.log('API listening on port 8080!')
		});
	})
	.catch(function(e){
		console.log("Failed to start server. Exiting");
	});
});

mongoose.connection.on('error',function (err) {
  console.log('mongoosed connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection closed');
    process.exit(0);
  });
});