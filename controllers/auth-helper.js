var exports = module.exports = {};
var jwt = require('jsonwebtoken');
var Response = require('../models/response-model');

exports.isAuthenticated = function (req, res, next) {
    // Check for auth
    var token = req.body.token || req.headers['token'];

    if (token) {

        jwt.verify(token, process.env.SECERET_KEY, function (err, decode) {
            if (err) {
                var response = new Response('error', 'Invalid token.');
                res.status(400).send(response);
                return;
            }
            else {
                req.userName = decode.userName;
                next();
            }
        });

    }
    else {
        var response = new Response('error', 'Token not provided.');
        res.status(400).send(response);
        return;
    }
}