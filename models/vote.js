'use strict'

var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
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
  toJSON: {virtuals: true}
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
