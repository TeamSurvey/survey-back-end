
'use strict';

var Poll = require('../models/poll');
var User = require('../models/User');

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
  }).then(done);
};

var create = function (title, options, owner_id) {
  Poll.create({
    'title': title,
    'options': options,
    'owner_id': owner_id
  }).then(function(poll) {
    console.log(poll);
  }).catch(console.error).then(done);;
};

//UPDATE TITLE OF POLL
var update = function(id, field, value) {
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
