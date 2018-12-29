var PORT = process.env.PORT || 5000;
var cors = require('cors');
var api = require('../api/apimaster');
var mobileApi = require('../mobile/api/apimaster');

module.exports = function( app ){

    /*
        TODO : add cors options if needed
    */
/*
   let whitelist = ['http://localhost:3000'];

   let corsOptions = {
     origin: function (origin, callback) {
       if (whitelist.indexOf(origin) !== -1) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     }
   };*/

   app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
     

    
    //=====================  create router and server listner one time ==========================

    app.use('/api', api);
    app.use('/m/api', mobileApi);

    app.get( '/', (req, res) => {
        res.status(200).json({ message : 'server root connection success'})
    });

    app.listen(PORT, () => {
        console.log('server start listening to port : ' + PORT);
    });

    //===========================================================================================

}