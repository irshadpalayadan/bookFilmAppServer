const authRouter = require('express').Router();
const passport = require('passport');
const webUrl = require('../config/key').bookFilmWeb.url;
const userProfile = require('../service/userProfile/userProfile');


authRouter.get('/signin', passport.authenticate('local-signin', {failWithError : true}), 
    (req, res) => {
        req.session.loginType = 'localSignin';
        res.status(200).json({ signin: 'success', redirectUrl : webUrl.concat('/dashboard')});
    }, (err, req, res, next) => {
        res.status(401).json({ signin: 'fail'});
})
.post('/signup', passport.authenticate('local-signup', {failWithError : true}),
    (req, res) => {
        req.session.loginType = 'localSignin';
        res.status(200).json({ signup: 'success', redirectUrl : webUrl.concat('/dashboard')});
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'}
    );
})
.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )
.get('/google/callback', passport.authenticate('google', {failWithError : true}),
    (req, res) => {
        req.session.loginType = 'google';
        res.redirect(webUrl.concat('/dashboard'));
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'});
    }
).get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).json({ status: 'success', redirectUrl: webUrl});
    });
})
.get('/signinstatus', (req, res) => {
    if( req.isAuthenticated() ) {
        res.status(200).json({ status: 'success', redirectUrl: webUrl.concat('/dashboard') });
    } else {
        res.status(200).json({ status: 'fail', redirectUrl: webUrl });
    }
})
.get('/userprofile', (req, res) => {
    if( req.isAuthenticated() ) {
        (new userProfile()).getBasicProfile(req.session.loginType, req.user.id)
        .then((profile, err) => {
            profile.status = 'success';
            res.status(200).json(profile);
        })
        
    } else {
        res.status(200).json({ status: 'fail', redirectUrl: webUrl });
    }
});


module.exports = authRouter;