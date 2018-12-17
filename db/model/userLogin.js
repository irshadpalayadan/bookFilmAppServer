var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');

var userLogin = new schema({
    id          : mongoose.Schema.Types.ObjectId,
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

var userLoginModel = mongoose.model('test', userLogin);

module.exports = userLoginModel;