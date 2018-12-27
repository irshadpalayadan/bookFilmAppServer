const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const userLogin = require('../db/model/userLoginModel');
const key = require('./key');


module.exports = function( app ) {

    

    /*
    TODO :  handle the express session with proper option ..
            store the sesion in the mongo db

            app.use(session({
  name: 'xpressBlu.sess', store: new mongodbStore({
    mongooseConnection: mongoose.connection,
  touchAfter: 24 * 3600}), secret: 'qwertyuiop123456789', resave: false,
  saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 15}}));
    */
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use( expressSession({ secret: key.expressSession.secret , resave: true, saveUninitialized: true}) );
    require('../service/passport/passportLocal')(passport);
    require('../service/passport/passportGoogle')(passport);
    app.use( passport.initialize() );
    app.use( passport.session() );


    passport.serializeUser( function( user, done ) {
        done(null, user.id);
    });

    passport.deserializeUser( function( id, done ) {
        userLogin.findById(id, function(err, user) {
            done(null, user);
        });
    });
}