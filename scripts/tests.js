'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../controllers/poll.js');
require('../models/pollAnswer.js');
require('../models/pollAnswer.js');
mongoose.model('User', require('../models/User'));
var Poll = mongoose.model('Poll', require('../models/poll'));
mongoose.model('pollAnswer', require('../models/pollAnswer'));

mongoose.connect("mongodb://localhost/survey");
var db = mongoose.connection;


var done = function () {
  db.close();
};

var create = function (title, options, owner_id) {
  Poll.create({
    'title': title,
    'options': options,
    'owner_id': owner_id
  }).then(function(poll) {
    console.log(poll);
  }).catch(console.error).then(done);
};

var read = function (field, criterion) {
  var search = {};
  search[field] = criterion;
  // console.log(criterion);
  // if(criterion[0] === '/') {
  //   search[field] = new RegExp(criterion.slice(1, criterion.length-1));
  //   console.log()
  // } else {
  //   search[field] = criterion;
  // }

  Poll.find(search).exec().then(function (polls) {
    polls.forEach(function(poll) {
      console.log("test" + poll.toObject());
    });
  }).catch(console.error).then(done);
};

var update = function(id, field, value) {
  Poll.findById(id).exec().then(function(poll) {
    poll[field] = value; //this line breaks for given_name and surname due to nested schema
    //don't nest the fields in your schema (for now)!!
    return poll.save();
  }).then(function(poll) {
    console.log(poll.toJSON());
  }).catch(console.error).then(done);
};

var destroy = function (id) {
  Poll.findById(id).exec().then(function(poll) {
    return poll.remove();
  }).catch(console.error).then(done);
};

db.once('open', function() {
  var command = process.argv[2];
  var field, id;

  switch(command) {
    case 'c':
    var title = process.argv[3];
    var options = process.argv[4].split(',').map(function(name){ return name.trim(); });
    var owner_id = process.argv[5];
    if (true || title) {
      create(title, options, owner_id);
    } else {
      console.log('usage c <title> <options> <owner_id>');
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
    case 'u':
      id = process.argv[3];
      field = process.argv[4];
      var value = process.argv[5];
      update(id, field, value);
    break;
    case 'd':
      id = process.argv[3];
      destroy(id);
    break;
    default:
      index();
    break;
  }
});



// var read = function (req, res, next) {
//   Poll.find({"_id": req.params.id}).exec()
//   .then(function(poll){
//     res.json(poll);
//   }).catch(function(error){
//     next(error);
//   }).then(done);
// };
