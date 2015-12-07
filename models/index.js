'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.model('User', require('./User'));
mongoose.model('Poll', require('./poll'));
mongoose.model('pollAnswer', require('./pollAnswer'));

mongoose.connect(process.env.MONGOLAB_URI); //"mongodb://localhost/survey"

module.exports = mongoose;
