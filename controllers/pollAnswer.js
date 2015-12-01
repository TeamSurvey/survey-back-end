'use strict';

var pollAnswer = require('../models/pollAnswer');

var done = function() {
  db.close();
};

// var index = function() {
//   Poll.find().exec().then(function(poll) {
//     polls.forEach(function(poll) {
//       console.log(poll.toJSON());
//     });
//   }).catch(console.error).then(done);
// };

var read = function (req, res, next) {
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  }).then(done);
};

var create = function (pollID, answer) {
  Poll.create({
    'pollID': pollID,
    'answer': answer
  });
};

module.exports = {
  //index,
  read,
  create
};
