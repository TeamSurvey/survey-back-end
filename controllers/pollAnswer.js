'use strict';

var pollAnswer = require('../models/pollAnswer');

var done = function() {
  db.close();
};

var read = function (req, res, next) {
  pollAnswer.find({"_id": req.body.pollID}).exec()
  .then(function(pollAnswer){
    var agg = pollAnswer.aggregate({$match: {"pollID": }})
    res.json(agg);
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
