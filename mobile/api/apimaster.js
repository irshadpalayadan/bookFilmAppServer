const api = require('express').Router();

//Rout to authentication
const authApi = require('./auth');
api.use('/auth', authApi);



module.exports = api;