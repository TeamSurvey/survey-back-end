
'use strict';

var util = require('util');
var Poll = require('../models/poll');
var User = require('../models/User');

var index = function(req, res, next) {
  console.log("executing index route ");
  Poll.find().exec().then(function(polls) {
    console.log("my polls are = " + polls);
    res.json(polls);
  }).catch(function(error){
    next(error);
  });
};

var read = function (req, res, next) {
  console.log("poll read params id is = ", req.params.id);
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  });
};

var create = function (req, res, next) {
  console.log("here are the create params " + util.inspect(req.body));
  console.log('req.user is ' + req.user);

  var options = [req.body.option01, req.body.option02, req.body.option03, req.body.option04, req.body.option05];
  Poll.create({
    'title': req.body.title,
    'options': options,
    'owner_id': req.user.id
  }).then(function(poll) {
    res.json(poll);
  }).catch(function(error){
    next(error);
  });
};

var update = function (req, res, next) {
  console.log("here are update params: " + req.params.id);
  console.log("log of req.body.title: " + req.body.title);
  console.log("log of req.params.title: " + req.params.title);
  Poll.findOneAndUpdate({"_id": req.params.id}, {$set: {title: req.body.poll.title}}, {new: true}).exec()
  .then(function(poll) {
    console.log("This poll is being returned: " + poll);
    res.json(poll);
  })
  .catch(function(error){
    next(error);
  });
};

var destroy = function (req, res, next) {
  Poll.findByIdAndRemove(req.params.id).exec()
  .then(function() {
    res.json('Succesfully Deleted');
  })
  .catch(function(error){
    next(error);
  });
};

module.exports = {
  index,
  read,
  create,
  destroy,
  update
};
