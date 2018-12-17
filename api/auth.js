const authRouter = require('express').Router();
const passport = require('passport');


authRouter.get('/google', passport.authenticate('google', { scope: ["profile"] } ))
.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(200).json({ status : 'success', message : 'google authentication success'});
})
.get('/login', (req, res) => {
    const username = req.query.user;
    const password = req.query.pass;
    if( username != '' && password != '') {
        res.status(200).json({ login: 'success'});
    }
    console.log( 'module::/api/auth - method::get/login - username : ' + username + ' password : ' + password);
});


module.exports = authRouter;