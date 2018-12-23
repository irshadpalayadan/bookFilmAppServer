const expressSession = require('express-session');
const passport = require('passport');
const userLogin = require('../db/model/userLoginModel');
const key = require('./key');

/*TODO :  get the setting from key
passport.use( new googleStrat({ 
    callbackURL: '/api/auth/google/redirect',
    clientID : key.googleAuth.clientID,
    clientSecret : key.googleAuth.secret,
}, ( acessToken, refreshToken, profile, done ) => {
    
    console.log('passport call back function fired');
    console.log('profile :' + profile);
})
);

*/

module.exports = function( app ) {

    passport.serializeUser( function( user, done ) {
        done(null, user.id);
    });

    passport.deserializeUser( function( id, done ) {

        userLogin.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /*
    TODO :  handle the express session with proper option ..
            store the sesion in the mongo db

            app.use(session({
  name: 'xpressBlu.sess', store: new mongodbStore({
    mongooseConnection: mongoose.connection,
  touchAfter: 24 * 3600}), secret: 'qwertyuiop123456789', resave: false,
  saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 15}}));
    */
    app.use( expressSession({ secret: key.expressSession.secret , resave: false, saveUninitialized: true}) );
    require('../service/passport/passportLocal')(passport);
    app.use( passport.initialize() );
    app.use( passport.session() );
}