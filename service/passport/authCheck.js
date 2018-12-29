module.exports = function(req, res, next) {
        if(req.isAuthenticated()) {
           next();
        } else {
            res.status(200).json({ status: 'fail'});
        }
    }