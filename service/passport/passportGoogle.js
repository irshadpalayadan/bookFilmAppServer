const googleStartegy = require('passport-google-oauth2').Strategy;
const key = require('../../config/key');
const userLogin = require('../../db/model/userLoginModel');
const userDetails = require('../../db/model/userDetailsModel');


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
                var user_login = new userLogin({
                    google : {  id  : profile.id,
                                displayName : profile.displayName,
                                name : { firstName  : profile.name.givenName,
                                         middleName : profile.name.middleName,
                                         lastName   : profile.name.familyName,
                                        },
                                imgUrl : imgUrl,
                             },
                    email: email,
                    priv: 'basic'
                });

                user_login.save( (err, obj) => {

                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {
                        var user_details = new userDetails({
                            userLoginId: obj.id,
                            name: email,
                            email: email,
                        });
                        user_details.save((err, obj) => {
    
                            if(err != null ) {
                                return done(null, false, {signup: 'fail' });
                            } else {
                                return done(null, user_login);
                            }
                        });
                    }
                    
                });
            }  else if( existingUser.google.id == null ){

                existingUser.google = {  
                                        id  : profile.id,
                                        displayName : profile.displayName,
                                        name : { firstName  : profile.name.givenName,
                                                middleName : profile.name.middleName,
                                                lastName   : profile.name.familyName,
                                                },
                                        imgUrl : imgUrl,
                                      };

                existingUser.save( (err, obj) => {
                    if(err != null ) {
                        return done(null, false, {signup: 'fail'});
                    } else {
                        return done(null, existingUser);
                    }
                });
                
            } else {
                return done(null, existingUser);
            }
        });
   }));
}
