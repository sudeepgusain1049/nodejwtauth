var exports = module.exports = {};
var jwt = require('jsonwebtoken');

exports.isAuthenticated = function (req, res, next) {
    // Check for auth
    var token = req.body.token || req.headers['token'];
    if (token) {

        jwt.verify(token, process.env.SECERET_KEY, function (err, decode) {
            if (err) {
                res.send('Invalid token.');
            }
            else {
                next();
            }
        });

    }
    else {
        res.send('Token not proviced.');
    }
}