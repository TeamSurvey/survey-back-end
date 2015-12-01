'use strict'

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: {
    type: []
  }
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
