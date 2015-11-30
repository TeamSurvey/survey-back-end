'use strict'

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  choices: {
    option01: {
      type: String,
      required: true
    },
    option02: {
      type: String,
      required: true
    },
    option03: {
      type: String,
      required: false
    },
    option04: {
      type: String,
      required: false
    },
    option05: {
      type: String,
      required: false
    }
  },
  owner_id: String,
  toJSON: {virtuals: true}
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
