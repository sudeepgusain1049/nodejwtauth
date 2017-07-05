var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jwtauth', { useMongoClient: true });

// Set routes
require('./controllers/index.js')(app, express.Router());

var port = process.env.port || 8080;
app.use(morgan('dev'));

app.listen(port);