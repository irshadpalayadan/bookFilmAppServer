const localStartegy = require('passport-local').Strategy;
const userLogin = require('../../db/model/userLoginModel');
const userDetails = require('../../db/model/userDetailsModel');

module.exports = function( passport ) {
    passport.use('local-signin', new localStartegy({
        usernameField : 'user',
        passwordField : 'pass',
        passReqToCallback : true,
    },
    function(req, user, pass, done) {
        
        userLogin.findOne( { $or : [{username: user}, {phno: user}, {email: user}] } )
        .then( (user) => {
            if( user != null) {

                user.checkPassword( pass )
                .then( ( isValid) => {
                    if(isValid === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, { signin: 'fail'});
                    }
                });
                
            } else {
                return done(null, false, { signin: 'fail'});
            }
            
        });
    }));
    
    
    passport.use('local-signup', new localStartegy({
        usernameField : 'user',
        passwordField : 'pass',
        passReqToCallback : true,
    }, 
    function(req, user, pass, done) {
        
        const email = req.query.email;
        const phno = req.query.phno;

        // TODO :  need to add express validation
        userLogin.findOne( { $or : [{username: user}, {phno: user}, {email: user}] } )
        .then( ( existingUser ) => {
            if( existingUser != null) {
                return done(null, false, { signup: 'fail'});
            } else {
                var user_login = new userLogin({
                    username: user,
                    email: email,
                    phno: phno,
                    pass: pass,
                    priv: 'basic'
                });

                user_login.save((err, obj) => {

                    if(err != null ) {
                        return done(null, false, {signup: fail});
                    } else {
                        var user_details = new userDetails({
                            userLoginId: obj.id,
                            name: user,
                            email: email,
                            phno: phno,
                        });
                        user_details.save((err, obj) => {
    
                            if(err != null ) {
                                return done(null, false, {signup: fail});
                            } else {
                                return done(null, obj);
                            }
                        });
                    }
                });
            }
        });
    }));

}