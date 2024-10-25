module.exports = function isGuest(req, res, next) {
    if (!req.session.user) {
        return next(); 
    }
    res.redirect('/profile'); 
};