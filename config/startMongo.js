//=============   below code will help to run local server  without key file   ==============
var keyData;
try {
    //chaange keys to key while deploying to heroku
    keyData = require('./keys');
} catch(e) {
    keyData = {mongoDB : { url : ''}};
}







//================== create  mongo db connection ============================================
var url = keyData.mongoDB.url || 'mongodb://localhost:27017/test';

var mongoose = require('mongoose');
mongoose.connect( url, { useNewUrlParser: true , useCreateIndex: true, autoIndex: false })
.then((res) => {
    console.log("Connected to Database Successfully.. : ) " + url);
})

mongoose.connection.on('error', (error) => {
    console.log('Oh... erroor ....  please have a look  - error : ' + error);
});

//============================================================================================