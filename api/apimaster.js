var api = require('express').Router();

var theatreApi = require('./theatre');
api.use('/theatre', theatreApi);



module.exports = api;