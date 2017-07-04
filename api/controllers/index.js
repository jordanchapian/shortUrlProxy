const express = require('express');
var router = express.Router();

//v1 api
router.use('/v1', require('./v1/index.js'));

//v2,v3,...,etc would go below
module.exports = router;