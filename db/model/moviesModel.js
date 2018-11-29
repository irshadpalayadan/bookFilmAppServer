var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns');

var person = new schema({
    id      : mongoose.Schema.Types.ObjectId,
    name    : { type : String, required : true },
    role    : { type : String, required : true },
  });

var movie = new schema({
    id      : mongoose.Schema.Types.ObjectId,
    name    : { type : String, required : true },
    desc    : { type : String, required : true },
    //TODO : the actors and crews must have a relationship to filmPerson table
    actors  : { type : [person], required : true },
    crews   : { type : [person], required : true },
    trailer : { type : String, required : true },
    poster  : { type : Buffer, required : true },
    rating  : { type : Number, default : 0 },
    relDate : { type : Date, required : true },
    lang    : { type : [String], required : true },
    showType: { type : String, default : '2D' },
    dura    : { type : String, default : '2h 30 min' },
    whoColumn
});

var moviesModel = mongoose.model('test', movie);

module.exports = moviesModel;