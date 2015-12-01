'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/survey');

var db = mongoose.connection;

var pollcontroller = require('../controllers/poll');
var Poll = require('../models/poll');

var done = function () {
  db.close();
};

var create = function (title, choices, votes, pollURL, owner_id) {
  Poll.create({
    'title': title,
    'choices': choices,
    'votes': votes,
    'pollURL': pollURL,
    'owner_id': owner_id
  }).then(function(poll) {
    console.log(poll);
  }).catch(console.error).then(done);
};

db.once('open', function() {
  var command = process.argv[2];
  var field, id;

  switch(command) {
    case 'c':
    var title = process.argv[3];
    var choices = process.argv[4];
    var votes = process.argv[5];
    var pollURL = process.argv[6];
    if (true || title) {
      create(title, choices, votes);
    } else {
      console.log('usage c <title> <choices> <votes>');
      done();
    }
    break;
    // case 'r':
    //   field = process.argv[3];
    //   var criterion = process.argv[4];
    //   if(!criterion) {
    //     console.log('usage: r <field> <criterion');
    //     done();
    //   }else {
    //     read(field, criterion);
    //   }
    // break;
    // case 'u':
    //   id = process.argv[3];
    //   field = process.argv[4];
    //   var value = process.argv[5];
    //   update(id, field, value);
    // break;
    // case 'd':
    //   id = process.argv[3];
    //   destroy(id);
    // break;
    default:
      index();
    break;
  }
});


