const authRouter = require('express').Router();
const passport = require('passport');

const userLogin = require('../db/model/userLoginModel');
const userDetails = require('../db/model/userDetailsModel');


authRouter.get('/google', passport.authenticate('google', { scope: ["profile"] } ))
.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(200).json({ status : 'success', message : 'google authentication success'});
})
.get('/login', passport.authenticate('local-signin', {failWithError : true}), 
    (req, res) => {
        res.status(200).json({ signin: 'success'});
    }, (err, req, res, next) => {
        res.status(401).json({ signin: 'fail'});
})
.post('/signup', passport.authenticate('local-signup', {failWithError : true}),
    (req, res) => {
        res.status(200).json({ signup: 'success'});
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'});
});


module.exports = authRouter;