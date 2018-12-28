var app = require('express')();



// authenticate oauth 2.0 using passport
require('./config/startPassportAuth')(app);


// this will start the server and return server refrence
require('./config/startServer')(app);


// this will start mongo db connection
require('./config/startMongo');



