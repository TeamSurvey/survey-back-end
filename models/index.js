'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.model('User', require('./User'));

mongoose.connect("mongodb://localhost/survey");

module.exports = mongoose.connection;
