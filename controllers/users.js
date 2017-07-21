'use strict';

var jwt = require('jsonwebtoken');
//var authHelper = require('./auth-helper');
var Response = require('../models/response-model');

module.exports = function (router) {
    var User = require('../models/users.js');

    router.get('/users', function (req, res, next) {
        var projection = {
            "firstName": 1, "lastName": 2, _id: 0
        };

        User.find({},
            projection,
            function (err, users) {
                res.json(users);
            });
    });

    router.get('/users/:userName', function (req, res, next) {

        var response = new Response();

        if (!req.userName) {
            res.status(400).send(new Response('error', 'User not authenticated.'));
            return;
        }

        var query = { "userName": req.userName };
        var projection = {
            "firstName": 1, "lastName": 2, _id: 0
        };

        User.find(query, projection, function (err, users) {
            if (err) {
                res.status(400).send(err);
                return;
            }

            res.json(users);
        });
    });
};