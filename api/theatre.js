
var theatre = require('express').Router();

theatre.get('/', (req, res) => {

    res.status(200).json({ message : 'theatre check success'});
});

module.exports = theatre;