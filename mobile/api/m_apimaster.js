const api = require('express').Router();

//Rout to authentication
const authApi = require('./m_auth');
api.use('/auth', authApi);



module.exports = api;