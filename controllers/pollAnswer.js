'use strict';

var util = require('util');
var pollAnswer = require('../models/pollAnswer');
// var Poll = require('../models/poll');

var done = function() {
  db.close();
};

// var read = function (req, res, next) {
//   console.log("pollAnswer read params id is = ", req.params.id);
//   pollAnswer.find({"_id": req.body.id}).exec()
//   .then(function(pollAnswer){
//     var agg = pollAnswer.aggregate({ $match: {"pollID": "565f0a753cc192af11e897ba"}}, { $group: { "_id": "$answer", "count": { $sum: 1 } } });
//     res.json(agg);
//     console.log("aggregation is: " + agg);
//   }).catch(function(error){
//     next(error);
//   }).then(done);
// };

var read = function (req, res, next) {
  var pollID = req.params.pollID;
  console.log("HERE IS THE POLLID " +pollID);
  pollAnswer.find({"pollID": req.params.pollID}).exec()
  .then(function(pollAnswers){
    console.log("pollAnswer read params id is = ", req.params.pollID);
    var agg = pollAnswers.forEach(function(answer){
      console.log("answer is: " + answer);
      var choiceCount = {};
      // if(!choiceCount.answer) {
      //   choiceCount.answer = 1;
      //   // console.log("in if choice:" + choiceCount);
      // } else {
      //   choiceCount.answer += 1;
      //   // console.log("in else choice:" + choiceCount);
      // }
    });
    // console.log("aggregation is: " + agg);
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
