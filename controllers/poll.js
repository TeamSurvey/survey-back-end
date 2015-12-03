
'use strict';
var util = require('util');
var Poll = require('../models/poll');
var User = require('../models/User');

var done = function() {
  db.close();
};

var index = function(req, res, next) {
  console.log("executing index route ");
  Poll.find().exec().then(function(polls) {
    console.log("my polls are = " + polls);
    res.json(polls);
  }).catch(console.error).then(done);
};

var read = function (req, res, next) {
  console.log("poll read params id is = ", req.params.id);
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  }).then(done);
};

var create = function (req, res, next) {
  console.log("here are the create params " + util.inspect(req.body));
  Poll.create({
    'title': req.body.title,
    'options': req.body.options,
    'owner_id': req.body.owner_id
  }).then(function(poll) {
    res.json(poll);
  }).catch(console.error).then(done);;
};

var update = function (req, res, next) {
  console.log("here are update params: " + util.inspect(req.body));
  Poll.findByIdAndUpdate(req.body.id, { $set: req.body.title }, { new: true }).exec().then(function(poll) {
    res.json(poll);
  })
  .catch(console.error).then(done);
};

var destroy = function (req, res, next) {
  Poll.findByIdAndRemove(req.params.id).exec()
  .then(function() {
    res.json('Succesfully Deleted');
  })
  .catch(function(error) {
    next(error);
  }).then(done);
};

module.exports = {
  index,
  read,
  create,
  destroy,
  update
};
