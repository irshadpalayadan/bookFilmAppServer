const api = require('express').Router();

//Rout to the theatre
const theatreApi = require('./theatre');
api.use('/theatres', theatreApi);

//Rout to authentication
const authApi = require('./auth');
api.use('/auth', authApi);



module.exports = api;