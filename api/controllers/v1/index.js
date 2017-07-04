const express = require('express');
var router = express.Router();

//api resources for v1 api
router.use('/links', require('./links.js'));

module.exports = router;