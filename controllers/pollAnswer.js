'use strict';

var pollAnswer = require('../models/pollAnswer');

var done = function() {
  db.close();
};

var read = function (req, res, next) {
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  }).then(done);
};

var create = function (pollID, answer) {
  pollAnswer.create({
    'pollID': pollID,
    'answer': answer
  }).then(function(pollAnswer) {
    console.log(pollAnswer);
  }).catch(console.error).then(done);;
};

module.exports = {
  read,
  create
};
