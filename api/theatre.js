var theatreRouter = require('express').Router();
var theatreModel = require('../db/model/theatreModel');

theatreRouter.get('/:filterBy', (req, res) => {

    console.log('module::/api/theatre - method::get/all - operation:: start of the method');
    var errorMessage = [];
    // filter theatre based on the location only
    if(req.params.filterBy === 'loc') {
        
        console.log('module::/api/theatre - method::get/all - message:: filter based on location');
        if( req.query.lat === "" || isNaN(Number(req.query.lat))) {
            errorMessage.push({object: 'lat', error: 'Invalid data'});

        } else if( req.query.long === "" || isNaN(Number(req.query.long))) {
            errorMessage.push({object: 'long', error: 'Invalid data'});

        } else {
            // get the theatre withis 15 miles (20 km) radius
            var locFilterQuery = { loc: { $geoWithin : { $centerSphere: [ [ Number(req.query.lat), Number(req.query.long) ], 15/3963.2 ] } } };
            theatreModel.find( locFilterQuery ).then((result) => {
                var resultJson = [];
                for(var i = 0; i< result.length; i++) {
                    resultJson.push({
                        id : result[i]._id,
                        name  : result[i].name,
                        screen  :result[i].screen,
                        place : result[i].place,
                        loc : { x : result[i].loc.x, y : result[i].loc.y},
                        rating : { clean : result[i].rating.clean, quality : result[i].rating.quality, seat: result[i].rating.seat },
                    });
                }
        
                console.log('module::/api/theatre - method::get/all - operation:: return data messgae:: total number of theatre : ' + result.length);
                res.status(200).json({ theatrelist: resultJson});
            })
            .catch((error)=> {
                console.log(error);
            });    
        }

    }

    // filter theatre based on the location and movieid
    if(req.params.filterBy === 'movie') {
        
        console.log('module::/api/theatre - method::get/all - message:: filter based on location');
        if( req.query.lat === "" || isNaN(Number(req.query.lat))) {
            errorMessage.push({object: 'lat', error: 'Invalid data'});

        } else if( req.query.long === "" || isNaN(Number(req.query.long))) {
            errorMessage.push({object: 'long', error: 'Invalid data'});

        } else if( req.query.cinema === "" ) {
            errorMessage.push({object: 'cinema', error: 'Invalid cinema'});

        } else {
            // get the theatre withis 15 miles (20 km) radius
            var locFilter = { theatreloc: { $geoWithin : { $centerSphere: [ [ Number(req.query.lat), Number(req.query.long) ], 15/3963.2 ] } } };
            var select = { theatreid : 1 };
            //TODO: add theatre and movie schema... need to test
            theatreAndMovieModel.find( locFilter, select).then(( theatreIDArray ) => {

                theatreModel.find( { _id: { $in: theatreIDArray } } ).then((result) => {

                    var resultJson = [];
                    for(var i = 0; i< result.length; i++) {
                        resultJson.push({
                            id : result[i]._id,
                            name  : result[i].name,
                            screen  :result[i].screen,
                            place : result[i].place,
                            loc : { x : result[i].loc.x, y : result[i].loc.y},
                            rating : { clean : result[i].rating.clean, quality : result[i].rating.quality, seat: result[i].rating.seat },
                        });
                    }
            
                    console.log('module::/api/theatre - method::get/all - operation:: return data messgae:: total number of theatre : ' + result.length);
                    res.status(200).json({ theatrelist: resultJson});
                })
                .catch((error) => {
                    console.log('module::/api/theatre - method::get/all - operation:: return data - error:: ' + error);
                });
            })
            .catch((error)=> {
                console.log('module::/api/theatre - method::get/all - operation:: return data - error:: ' + error);
            });
        }

    }

    if( errorMessage.length > 0 ) {
        res.status(400).json({ status: 'fail', errors : errorMessage});

    } 
    console.log('module::/api/theatre - method::get/all - operation:: end of the method');

})
.post('/', (req, res) => {

    console.log('module::/api/theatre - method::post - operation:: start of the method');

    // TODO : remove below with req parametres
    var theatreObj = new theatreModel({
        name    : 'test',
        screen    : 'test',
        place    : 'test',
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

module.exports = theatreRouter;