const authRouter = require('express').Router();
const passport = require('passport');

const userLogin = require('../db/model/userLoginModel');
const userDetails = require('../db/model/userDetailsModel');


authRouter.get('/google', passport.authenticate('google', { scope: ["profile"] } ))
.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(200).json({ status : 'success', message : 'google authentication success'});
})
.get('/login', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;
    // TODO :  need to add express validation
    userLogin.findOne({username: username, pass: password}).then((result) => {
        if( result != null) {
            res.status(200).json({ signin: 'success'});
        } else {
            res.status(400).json({ signin: 'fail'});
        }
        
    });
    console.log( 'module::/api/auth - method::get/login - username : ' + username + ' password : ' + password);
})
.post('/signup', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;
    const email = req.query.email;
    const phno = req.query.phno;
    // TODO :  need to add express validation
    var user_login = new userLogin({
        username: username,
        email: email,
        phno: phno,
        pass: password,
        priv: 'basic'
    });

    user_login.save((err, obj) => {

        // TODO : error handling
        var user_details = new userDetails({
            userLoginId: obj.id,
            name: username,
            email: email,
            phno: phno,
        });
        user_details.save((err, obj) => {
            // TODO : error handling
            res.status(200).json({ signup: 'success'});
        });
    })
});


module.exports = authRouter;