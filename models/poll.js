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
  votes: {
    option01Votes: {
      type: Number,
      required: true
    },
    option02Votes: {
      type: Number,
      required: true
    },
    option03Votes: {
      type: Number,
      required: false
    },
    option04Votes: {
      type: Number,
      required: false
    },
    option05Votes: {
      type: Number,
      required: false
    },
    default: 0 //not sure if syntax is correct here
  },
  owner_id: String,
  toJSON: {virtuals: true}
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
