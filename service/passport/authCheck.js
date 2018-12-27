module.exports = function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.status(200).json({ status: 'fail'});
        }
    }