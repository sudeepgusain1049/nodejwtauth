module.exports = function (app, secureRoutes, unsecureRoutes) {

    var jwt = require('jsonwebtoken');
    var User = require('../models/users');
    var Response = require('../models/response-model');
    var authHelper = require('./auth-helper');

    unsecureRoutes.get('/', function (req, res, next) {
        next();
        res.send('Welcome to auth api');
    });

    unsecureRoutes.post('/token', function (req, res, next) {

        User.findOne({ userName: req.body.userName, password: req.body.password }, { "userName": 1, _id: 0 }, function (err, docs) {

            var response = new Response();

            if (err || !docs) {
                
                response.status = 'error';
                response.message = 'User with this credentials does not exists.';
                res.send(response);
                return;
            }

            var tokenParams = {
                userName: req.body.userName
            };

            var token = jwt.sign(tokenParams, process.env.SECERET_KEY, { expiresIn: 4000 });
            response.status = 'success';
            response.token = token;
            res.send(response);
        });


    });

    require('./users.js')(secureRoutes);

    app.use('/api', unsecureRoutes);
    app.use('/api', authHelper.isAuthenticated, secureRoutes);
};