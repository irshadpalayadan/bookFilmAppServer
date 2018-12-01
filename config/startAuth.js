const passport = require('passport');
const googleStrat = require('passport-google-oauth20');
const key = require('./key');

//TODO :  get the setting from key
passport.use( new googleStrat({ 
    callbackURL: '/api/auth/google/redirect',
    clientID : key.googleAuth.clientID,
    clientSecret : key.googleAuth.secret,
}, ( acessToken, refreshToken, profile, done ) => {
    
    console.log('passport call back function fired');
    console.log('profile :' + profile);
})
);