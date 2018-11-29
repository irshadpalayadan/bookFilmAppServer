
var theatre = require('express').Router();
var theatreModel = require('../db/model/theatreModel');

theatre.get('/', (req, res) => {

    res.status(200).json();

})
.post('/', (req, res) => {

    console.log('module::/api/theatre - method::post - operation:: start of the method');

    var theatreObj = new theatreModel({
        name    : 'test6',
        screen    : 'test6',
        place    : 'test6',
    loc     : {
                x : 1,
                y : 1
              },
    });

    theatreObj.save((err, obj, next) => {

        if(err) {
            
            var error = [];
            if(err.name === 'ValidationError') {
                for(var e in err.errors)
                {
                    error.push({ object : err.errors[e].path, error : err.errors[e].message});
                    console.log('module::/api/theatre - method::post - operation:: new theatre creation error - error:: ' + err.errors[e]);
                }
                
            } else if( err.name === 'MongoError' && err.code === 11000) {
                error.push({ object : '[' + theatreObj.name+ ', ' + theatreObj.screen+']', error : "Duplicate records"});
            }
            
            res.status(400).json({ status: 'fail', errors : error});
        } else {
            console.log('module::/api/theatre - method::post - operation:: new theatre creation success ');
            res.status(200).json({ status: 'success'});
        }
    });


    console.log('module::/api/theatre - method::post - operation:: end of the method');
});

module.exports = theatre;