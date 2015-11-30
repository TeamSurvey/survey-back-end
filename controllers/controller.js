// 'use strict';

// var Controller = require('./Controller');

// var exampleController = new Controller();
// exampleController.setHandler('get', function exampleGet(req, res) {
//     res.status(200).json({
//         example : "Example!"
//     });
// });
// exampleController.setHandler('post', function examplePost(req, res) {
//     if(req.body) {
//         // echo
//         res.status(200).json(req.body);
//     } else {
//         // nothing to echo; incorrect request
//         res.sendStatus(400);
//     }
// });

// //  notice we don't need to explicitly give handlers to
// //      deny PATCH and DELETE requests

// module.exports = exampleController;

// jshint node: true
​
'use strict';
​
// we'll be doing most of the crud actions in a script
​
var mongoose = require('mongoose');
​
// tell mongoose to use global Promises, since mongoose ships with its own special Promise library
mongoose.Promise = global.Promise;

// you have to explicitly connect to the db
// this path will change for our project
// this opens a connection
// to the db (DOES NOT CLOSE IT)
mongoose.connect('mongodb://localhost/mongoose-crud');
// create the mongoose connection
// it's a property, not a method
var db = mongoose.connection;
​
var Person = require('./lib/person.js');
​
var done = function() {
  db.close();
};
​
var create = function (given_name, surname, dob, gender) {
  Person.create({
    'name.given': given_name,
    'name.surname': surname,
    dob: dob,
    gender: gender
    // if Promise is successful, do this
  }).then(function(person) {
    console.log(person);
    // if Promise is a fail, do this
  }).catch(function(error) {
    console.error(error);
    // close db no matter what
    // after all the previous code
    // has been executed
  }).then(done);
};
​
var index = function() {
  // query methods like .find and .findOne
    // don't return a Promise
    // chain on .exec to get the Promise
    // and make sure this action
    // behaves like a Promise
      Person.find().exec().then(function(people) {
        people.forEach(function(person) {
          console.log(person.toJSON());
        });
        // console.error is a function
        // always chain on a catch
        // at the end of this
        // anc close the connection
      }).catch(console.error).then(done);
};
​
var destroy = function(id) {
  Person.findById(id).exec().then(function(person) {
    // look up specific doc and remove from db
    // person.remove returns another promise
    // here which we'll pass along
    return person.remove();
  }).catch(console.error).then(done);
};
​
var read = function(field, criterion) {
  // in mongoose, specify an objectt to do a search
  var search = {};
  // test to see if criterion starts w a slash,
  // if so it's a regex
  if (criterion[0] === '/') {
    var regex = /^H/;
    // skip the position 0 (the '/'), start at position
    // one and take length -1 and create a new regex,
    // and set the search field to that regex
    search[field] = new RegExp(criterion.slice(1, criterion.length-1));
  } else {
    // or set that field to a string
    search[field] = criterion;
  }
  Person.find(search).exec().then(function(people) {
    people.forEach(function(person) {
      console.log(person.toObject());
    });
  }).catch(console.error).then(done);
};
​
var update = function(id, field, value) {
  // use this option
  var modify = {};
  modify[field] = value;
  Person.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(person) {
    console.log(person.toJSON());
  }).catch(console.error
  ).then(done);
};
​
// this option wasn't used
//   Person.findById(id).exec().then(function(person) {
//     // nested fields don't work with this
//     person[field] = value;
//     // return the promise
//     return person.save();
//   }).then(function(person) {
//     // log that it's saved
//     console.log(person.toJSON());
//   }).catch(console.error).then(done);
// };
​
​
// when the connection opens...
db.once('open', function() {
  // using more than once, avoiding jshint complaints
  var field, id;
  var command = process.argv[2];
  switch (command) {
    case 'c':
    var given_name = process.argv[3];
    var surname = process.argv[4];
    var dob = process.argv[5];
    var gender = process.argv[6];
​
    if (true || given_name) {
      create(given_name, surname, dob, gender);
    } else {
      // tell the user you need to give
      // a given_name (surname is optional)
      console.log('usage c <given_name> <surname> <date of birth> [gender]');
      // call node appthe done function
      // and close the connection
      done();
    }
​
    break;
    case 'r':
    // more like s for search, really
      field = process.argv[3];
      var criterion = process.argv[4];
      if (!criterion) {
        console.log('usage: r <field> <criterion>');
        done();
      } else {
        read(field, criterion);
      }
    break;
    case 'u':
      id = process.argv[3];
      field = process.argv[4];
      var value = process.argv[5];
    break;
    case 'd':
      id = process.argv[3];
      destroy(id);
    break;
    default:
      index();
    break;
  }
​
});

