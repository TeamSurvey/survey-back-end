'use strict'

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  choices: [],
  votes: [],
  pollURL: {
    type: String,
    required: true
  },
  owner_id: String
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
