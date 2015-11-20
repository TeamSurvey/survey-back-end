'use strict';

var mongoose = require('mongoose');

mongoose.model('User', require('./User'));

mongoose.connect("mongodb://localhost/passport-lesson");

module.exports = mongoose;
