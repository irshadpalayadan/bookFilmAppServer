var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');
var bcrypt = require('bcrypt');
var SALT_ROUND = 10;
var userLogin = new schema({
    local   :   {
                    username    : { type : String },
                    pass        : { type : String},
                },

    google  :   {
                    id          : { type : String},
                },
    email       : { type : String },
    priv        : [String],
    whoColumn
});

/*
    TODO: add index for uername, phno, email if needed
*/

userLogin.pre('save', function( next ) {

    if( this.isModified('local.pass') ) {
        bcrypt.genSalt(SALT_ROUND, (err, salt) => {
            if(err) {
                return next(err);
            } else {
                bcrypt.hash( this.local.pass, salt, (err, hash) => {
                    if(err) {
                        return next(err);
                    } else {
                        this.local.pass = hash;
                        next();
                    }
                });
            }
        });
    } else {
        next();
    }
});


userLogin.methods.checkPassword = function(password) {
     
    return bcrypt.compare(password, this.local.pass);
}


var userLoginModel = mongoose.model('userLogin', userLogin);

module.exports = userLoginModel;