'use strict'

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: {
    type: []
  },
  owner_id: {
    type: String,
    required: true
  }
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
