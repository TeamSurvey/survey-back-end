'use strict'

var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  votes: [],
  toJSON: {virtuals: true}
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
