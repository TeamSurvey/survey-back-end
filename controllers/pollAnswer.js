'use strict';

var util = require('util');
var pollAnswer = require('../models/pollAnswer');
var Poll = require('../models/poll');

var done = function() {
  db.close();
};

var read = function (req, res, next) {
  console.log("pollAnswer read params id is = ", req.params.id);
  pollAnswer.find({"_id": req.body.id}).exec()
  .then(function(pollAnswer){
    var agg = pollAnswer.aggregate({ $match: {"pollID": "565f0a753cc192af11e897ba"}}, { $group: { "_id": "$answer", "count": { $sum: 1 } } });
    res.json(agg);
    console.log("aggregation is: " + agg);
  }).catch(function(error){
    next(error);
  }).then(done);
};

var create = function (req, res, next) {
  console.log("here are the pollAnswer create params " + util.inspect(req.body));
  pollAnswer.create({
    'pollID': req.body.currentPollId, //CHANGE THIS. THE VAL WILL FROM FROM FRONT END HTML DATA-ATTR
    'answer': req.body.answer
  }).then(function(pollAnswer) {
    res.json(pollAnswer);
  }).catch(console.error).then(done);;
};

module.exports = {
  read,
  create
};
