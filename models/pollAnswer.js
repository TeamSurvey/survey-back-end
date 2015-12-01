'use strict'

var mongoose = require('mongoose');
var pollID = require('/models/poll');

var pollAnswerSchema = new mongoose.Schema({
  pollID: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

var pollAnswer = mongoose.model('pollAnswer', pollAnswerSchema);

module.exports = pollAnswer;
