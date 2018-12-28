var mongoose = require('mongoose');
var schema = mongoose.Schema;

var whoColumns = {
    createdBy       : String,
    createdDate     : Date,
    // TODO: need to update when user login enabled
    lastUpdatedBy   : {type : String, default : 'default user'},
    lastUpdateDate  : {type : String, default : (new Date()).toUTCString() },
};

module.exports = whoColumns;