const localStartegy = require('passport-local').Strategy;
const userLogin = require('../../db/model/userLoginModel');
const userDetails = require('../../db/model/userDetailsModel');
const gmailClient = require('../email/gmailClient');

module.exports = function( passport ) {
    passport.use('local-signin', new localStartegy({
        usernameField : 'user',
        passwordField : 'pass',
        passReqToCallback : true,
    },
    function(req, user, pass, done) {
        
        userLogin.findOne( { $or : [{'local.username' : user}, {'local.phno' : user}, {email : user}] } )
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
        userLogin.findOne( {'email' : email} )
        .then( ( existingUser ) => {

            if ( existingUser == null ) {
                // Here no user with email create new one

                var user_login = new userLogin({
                    local : {   username: user,
                                pass: pass,
                            },
                    email: email,
                    priv: 'basic',
                });

                user_login.save((err, obj) => {

                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {
                        
                        var user_details = new userDetails({
                            userLoginId: obj.id,
                            name: user,
                            email: email,
                            phno: phno,
                        });
                        user_details.save((err, obj) => {
    
                            if(err != null ) {
                                return done(null, false, {signup: 'fail' });
                            } else {
                                (new gmailClient()).sendDefaultWelcomeMail(email);
                                return done(null, user_login);
                            }
                        });
                    }
                });
            } else if( existingUser.local.username == null) {

                // Here user may signed in with google or fb
                // privilege proprty should be carried. 

                existingUser.local = {   
                                        username: user,
                                        pass: pass,
                                     };

                existingUser.save((err, obj) => {

                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {

                        userDetails.findOne( { email : email } )
                        .then((detail) => {
                            detail.name = user;
                            detail.phno =  phno;
                            detail.save((err, obj) => {
    
                                if(err != null ) {
                                    return done(null, false, {signup: 'fail' });
                                } else {
                                    return done(null, existingUser);
                                }
                            });
                        });
                    }
                });
            } else {
                return done(null, false, {signup: 'fail' });
            }
        });
    }));

}