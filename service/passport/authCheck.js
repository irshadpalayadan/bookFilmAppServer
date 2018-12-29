module.exports = function(req, res, next) {
        if(req.isAuthenticated()) {
           
        } else {
            res.status(200).json({ status: 'fail'});
        }
    }