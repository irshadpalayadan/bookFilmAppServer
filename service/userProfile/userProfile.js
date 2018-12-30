const userDetails = require('../../db/model/userDetailsModel');

class UserProfile {
    
    getBasicProfile( loginType, userId) {

        var profile = {};
        if(loginType == 'google') {
            return userDetails.findOne({userLoginId : userId})
            .then((details) => {
                profile.name = details.name;
                profile.email = details.email;
                profile.img = { type : 'url', value : details.google.imgUrl };
                return profile;
            });
        } else if(loginType == 'localSignin') {

            //TODO :  change the image url to user added if not take from gmail thump
            return userDetails.findOne({userLoginId : userId})
            .then((details) => {
                profile.name = details.name;
                profile.email = details.email;
                profile.img = { type : 'url', value : details.google.imgUrl };
                return profile;
            });
        }


    }
}

module.exports = UserProfile;