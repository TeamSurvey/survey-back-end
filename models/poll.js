'use strict'

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  choices: [],
  owner_id: String,
  toJSON: {virtuals: true}
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
