var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');

var userDetails = new schema({
    userLoginId         : mongoose.Schema.Types.ObjectId,
    name                : { type : String, required : true },
    localImgBuffer      : { type : Buffer },
    google              : {
                            imgUrl        : { type : String },
                            displayName   : { type : String },
                          },
    email               : { type : String },
    phno                : { type : String},
    address             : { type : String},
    whoColumn
});

var userDetailsModel = mongoose.model('userDetails', userDetails);

module.exports = userDetailsModel;