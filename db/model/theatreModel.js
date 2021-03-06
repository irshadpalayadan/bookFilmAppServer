var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');

var theatre = new schema({
    name    : { type : String, required : true },
    screen  : { type : String, required : true },
    place   : { type : String, required : true },
    loc     : {
                x : {type : Number, default : 0 },
                y : {type : Number, default : 0 },
              },
    
    rating  : {
                clean : {type : Number, default : 0 },
                quality : {type : Number, default : 0 },
                seat : {type : Number, default : 0 },
              },
    whoColumn
});

theatre.index({ name: 1, screen: 1}, { unique: true});

var theatreModel = mongoose.model('theatre', theatre);

module.exports = theatreModel;