
'use strict';

var mongoose = require('mongoose');
var Poll = require('../models/poll');
mongoose.Promise = global.Promise;
module.exports = mongoose.connection;

var done = function() {
  db.close();
};

var index = function() {
  Poll.find().exec().then(function(poll) {
    polls.forEach(function(poll) {
      console.log(poll.toJSON());
    });
  }).catch(console.error).then(done);
};

var read = function (req, res, next) {
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  });
};

var create = function (title, choices, votes, owner_id) {
  Poll.create({
    'title': title,
    'choices': choices,
    'votes': votes,
    'owner_id': owner_id
  });
};

var update = function(id, field, value) {
  // use this option
  var modify = {};
  modify[field] = value;
  Poll.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(poll) {
    console.log(poll.toJSON());
  }).catch(console.error
  ).then(done);
};

var destroy = function (id) {
  Poll.findById(id).exec().then(function(poll) {
    return poll.remove();
  }).catch(console.error).then(done);
};

module.exports = {
  index,
  read,
  destroy,
  update
};
