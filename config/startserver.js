var app = require('express')();
var PORT = process.env.PORT || 3000;


//=====================  create router and server listner one time ==========================

var api = require('../api/apimaster');

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json({ message : 'server root connection success'})
});

app.listen(PORT, () => {
    console.log('server start listening to port :  $(PORT)');
});

//===========================================================================================
