const authRouter = require('express').Router();
const passport = require('passport');
const authCheck = require('../../service/passport/authCheck');
const webUrl = require('../../config/key').bookFilmWeb.url;

authRouter.get('/signin', passport.authenticate('local-signin', {failWithError : true}), 
    (req, res) => {
        res.status(200).json({ signin: 'success', redirectUrl : webUrl.concat('/dashboard')});
    }, (err, req, res, next) => {
        res.status(401).json({ signin: 'fail'});
    }
)
.post('/signup', passport.authenticate('local-signup', {failWithError : true}),
    (req, res) => {
        res.status(200).json({ signup: 'success', redirectUrl : webUrl.concat('dashboard')});
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'});
    }
)
.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )
.get('/google/callback', passport.authenticate('google', {failWithError : true}),
    (req, res) => {
        res.redirect(webUrl.concat('/dashboard'));
    }, (err, req, res, next) => {
        res.status(401).json({ signup: 'fail'});
    }
)
.get('/signinstatus', authCheck, (req, res) => {
    res.status(200).json({ status: 'success', redirectUrl: webUrl.concat('/dashboard')});
})
.get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).json({ status: 'success', redirectUrl: webUrl});
    });
});



module.exports = authRouter;