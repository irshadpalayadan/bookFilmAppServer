var app = require('express')();
var PORT = process.env.PORT || 3000;


//=====================  create router and server listner one time ==========================

var api = require('./api/api');

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json({ message : 'server root connection success'})
});

app.listen(PORT, () => {
    console.log('server start listening to port :  $(PORT)');
});

//===========================================================================================





//================== create  mongo db connection ============================================

var serverUrl = 'mongodb://bookfilm:bookfilm1@ds157522.mlab.com:57522/bookfilmserver';
var localUrl = 'mongodb://localhost:27017/test';

var mongoose = require('mongoose');
mongoose.connect(serverUrl, { useNewUrlParser: true , useCreateIndex: true, autoIndex: false })
.then((res) => {
    console.log("Connected to Database Successfully.. :) ");
})

mongoose.connection.on('error', (error) => {
    console.log('Oh... erroor ....  please have a look  - error : ' + error);
});

//============================================================================================