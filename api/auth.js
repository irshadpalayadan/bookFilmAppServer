const authRouter = require('express').Router();
const passport = require('passport');


authRouter.get('/google', passport.authenticate('google', { scope: ["profile"] } ))
.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(200).json({ status : 'success', message : 'google authentication success'});
});

module.exports = authRouter;