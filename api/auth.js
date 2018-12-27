const authRouter = require('express').Router();
const passport = require('passport');

const userLogin = require('../db/model/userLoginModel');
const userDetails = require('../db/model/userDetailsModel');
const authCheck = require('../service/passport/authCheck');

authRouter.get('/signin', passport.authenticate('local-signin', {failWithError : true}), 
    (req, res) => {
        res.status(200).json({ signin: 'success', redirectUrl : 'http://localhost:3000/dashboard'});
    }, (err, req, res, next) => {
        res.status(401).json({ signin: 'fail'});
})
.post('/signup', passport.authenticate('local-signup', {failWithError : true}),
    (req, res) => {
        res.status(200).json({ signup: 'success', redirectUrl : 'http://localhost:3000/dashboard'});
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'}
    );
})
.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )
.get('/google/callback', passport.authenticate('google', {failWithError : true}),
    (req, res) => {
        res.redirect('http://localhost:3000/dashboard');
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'});
    }
).get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('http://localhost:3000');
    });
})
.get('/signinstatus', authCheck, (req, res) => {
    res.status(200).json({ status: 'success', redirectUrl: 'http://localhost:3000/dashboard'});
});


module.exports = authRouter;