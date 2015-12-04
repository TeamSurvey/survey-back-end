'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../controllers/poll.js');
require('../models/pollAnswer.js');
require('../models/pollAnswer.js');
mongoose.model('User', require('../models/User'));
var Poll = mongoose.model('Poll', require('../models/poll'));
var pollAnswer = mongoose.model('pollAnswer', require('../models/pollAnswer'));

mongoose.connect("mongodb://localhost/survey");
var db = mongoose.connection;


var done = function () {
  db.close();
};

// var index = function() {
//   Pa.find().exec().then(function(pollAnswer) {
//     pollAnswers.forEach(function(pollAnswer) {
//       console.log(pollAnswer.toJSON());
//     });
//   }).catch(console.error).then(done);
// };

var create = function (pollID, answer) {
  pollAnswer.create({
    'pollID': pollID,
    'answer': answer
  }).then(function(pollAnswer) {
    console.log(pollAnswer);
  }).catch(console.error).then(done);;
};

db.once('open', function() {
  var command = process.argv[2];
  var field, id;

  switch(command) {
    case 'c':
    var pollID = process.argv[3];
    var answer = process.argv[4];
    if (true || pollID) {
      create(pollID, answer);
    } else {
      console.log('usage c <pollID> <answer>');
      done();
    }
    break;
    case 'r':
      id = process.argv[3];
      var criterion = process.argv[4];
      if(!criterion) {
        console.log('usage: r <field> <criterion>');
        done();
      }else {
        read(field, criterion);
      }
    break;
    default:
      "hello";
    break;
  }
});
