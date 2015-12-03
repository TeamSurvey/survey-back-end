'use strict';

var db = require('../models/index.js');
var util = require('util');
var pollAnswer = require('../models/pollAnswer');
// var Poll = require('../models/poll');

var done = function() {
  db.close();
};

var read = function (req, res, next) {
  pollAnswer.aggregate([{ $match: {"pollID": req.params.pollID}}, { $group: { "_id": "$answer", "count": { $sum: 1 } } }]
    ).exec().then(function(pollAnswer) {
    res.json(pollAnswer);
  }).catch(console.error).then(done);
};


var create = function (req, res, next) {
  console.log("here are the pollAnswer create params " + util.inspect(req.body));
  pollAnswer.create({
    'pollID': req.body.currentPollId, //CHANGE THIS. THE VAL WILL FROM FROM FRONT END HTML DATA-ATTR
    'answer': req.body.answer
  }).then(function(pollAnswer) {
    res.json(pollAnswer);
  }).catch(console.error).then(done);
};

module.exports = {
  read,
  create
};
