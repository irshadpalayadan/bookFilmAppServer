var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');
var bcrypt = require('bcrypt');
var SALT_ROUND = 10;
var userLogin = new schema({
    username    : { type : String, required : true },
    email       : { type : String },
    phno        : { type : String},
    pass        : { type : String, required : true },
    priv        : [String],
    whoColumn
});

/*
    TODO: add index for uername, phno, email if needed
*/

userLogin.pre('save', function( next ) {

    if( this.isModified('pass') ) {
        bcrypt.genSalt(SALT_ROUND, (err, salt) => {
            if(err) {
                return next(err);
            } else {
                bcrypt.hash( this.pass, salt, (err, hash) => {
                    if(err) {
                        return next(err);
                    } else {
                        this.pass = hash;
                        next();
                    }
                });
            }
        });
    }
});


userLogin.methods.checkPassword = function(password) {
     
    return bcrypt.compare(password, this.pass);
}


userLogin.method.validateUser = (username, password) => {
    
    var user = this.find({username : username}, (err, user) => {
        console.log(user);
    })
}


var userLoginModel = mongoose.model('userLogin', userLogin);

module.exports = userLoginModel;