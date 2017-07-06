var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var secureRoutes = express.Router();
var unsecureRoutes = express.Router();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jwtauth', { useMongoClient: true });

process.env.SECERET_KEY = "secretkey";

// Set routes
require('./controllers/index.js')(app, secureRoutes, unsecureRoutes);

var port = process.env.port || 8080;
app.use(morgan('dev'));

app.listen(port);