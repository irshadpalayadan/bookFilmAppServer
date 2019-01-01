const googleStartegy = require('passport-google-oauth2').Strategy;
const key = require('../../config/key');
const userLogin = require('../../db/model/userLoginModel');
const userDetails = require('../../db/model/userDetailsModel');
const gmailClient = require('../email/gmailClient');


module.exports = function( passport ) {

    passport.use(new googleStartegy({
        clientID     : key.googleAuth.clientID,
        clientSecret : key.googleAuth.secret,
        callbackURL  : key.googleAuth.redirectUrl
    },
    function(accessToken, refreshToken, profile, done) {
        
        var email = profile.emails.find( emailObj => { if( emailObj.type == 'account') return emailObj}).value;
        var imgUrl = profile.photos.length > 0 ? profile.photos[0].value : null;
        // TODO :  need to add express validation
        userLogin.findOne( { email : email } )
        .then( ( existingUser ) => {

            if( existingUser == null ) {

                // here there is no user exist with the email,
                // so create a new one

                var user_login = new userLogin({
                    google : { id  : profile.id },
                    email: email,
                    priv: 'basic'
                });

                user_login.save( (err, obj) => {

                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {
                        var user_details = new userDetails({
                            userLoginId: obj.id,
                            name: profile.displayName,
                            google : {  
                                        displayName : profile.displayName,
                                        imgUrl : imgUrl,
                                     },
                            email: email,
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
            }  else if( existingUser.google.id == null ){

                // Here already a sighnup user exist. so donot alter email, priv in loginData
                // userloginid, email and name in the user details
                // only update the google data

                existingUser.google = { id  : profile.id };

                existingUser.save( (err, obj) => {
                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {
                        userDetails.findOne( { email : email } )
                        .then((detail) => {
                            detail.google = {  
                                                displayName : profile.displayName,
                                                imgUrl : imgUrl,
                                            };
                            detail.save((err, obj) => {
                                if(err) {
                                    return done(null, false, {signup: 'fail'});
                                } else {
                                    return done(null, existingUser);
                                }
                            });
                        })
                    }
                });
                
            } else {
                return done(null, existingUser);
            }
        });
   }));
}
