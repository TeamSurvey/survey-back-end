'use strict'

var db = require('../lib/db.js')
var pollcontroller = require('../controllers/poll');
var Poll = require('../models/poll');

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

var read = function (req, res, next) {
  Poll.find({"_id": req.params.id}).exec()
  .then(function(poll){
    res.json(poll);
  }).catch(function(error){
    next(error);
  }).then(done);
};

// var update = function(id, field, value) {
//   var modify = {};
//   modify[field] = value;
//   Poll.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(poll) {
//     console.log(poll.toJSON());
//   }).catch(console.error
//   ).then(done);
// };

var update = function(id, field, value) {
  Poll.findById(id).exec().then(function(poll) {
    poll[field] = value; //this line breaks for given_name and surname due to nested schema
    //don't nest the fields in your schema (for now)!!
    return poll.save();
  }).then(function(poll) {
    console.log(poll.toJSON());
  }).catch(console.error).then(done);
};

db.once('open', function() {
  var command = process.argv[2];
  var field, id;

  switch(command) {
    case 'c':
    var title = process.argv[3];
    var options = process.argv[4];
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
        console.log('usage: r <field> <criterion');
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
    // case 'd':
    //   id = process.argv[3];
    //   destroy(id);
    // break;
    default:
      index();
    break;
  }
});


