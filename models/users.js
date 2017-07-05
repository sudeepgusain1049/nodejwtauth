var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({ userName: String, password: String }, { collection: 'Users' });

module.exports = mongoose.model('User', userModel);