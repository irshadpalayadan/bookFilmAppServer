var api = require('express').Router();

var theatreApi = require('./theatre');
api.use('/theatres', theatreApi);



module.exports = api;