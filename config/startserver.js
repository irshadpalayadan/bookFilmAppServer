var PORT = process.env.PORT || 5000;
var cors = require('cors')();
var api = require('../api/apimaster');


module.exports = function( app ){

    /*
        TODO : add cors options if needed
    */
    app.use(cors);

    
    //=====================  create router and server listner one time ==========================

    app.use('/api', api);

    app.get('/', (req, res) => {
        res.status(200).json({ message : 'server root connection success'})
    });

    app.listen(PORT, () => {
        console.log('server start listening to port : ' + PORT);
    });

    //===========================================================================================

}