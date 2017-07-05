module.exports = function (router) {
    var User = require('../models/users.js');

    router.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    });

};