'use strict'

var express = require('express');
var router = express.Router();

var pollCtrl = //reuqire file here//

//routing to an index action
router.get('/', function(req, res, next) {
  res.json({message: 'Hello, World!'});

// var pollCtrl = require('../controllers/poll');

//routing to an index action
router.get('/', function(req, res, next) {
  Poll.find().exec();

  next();
});

//routing to a show action
router.get('/:id', function(req, res, next) {

  res.json({message: 'stuff'});

  var poll_id = req.params.id;

  next();
});

router.get('/', function(req, res) {
  res.json(res.locals.polls);
  res.status(200);
});





router.post('/', function (req, res) {
  res.json('POST request');
});

router.post('/', function (req, res) {
  res.send('create request to homepage');
});

router.patch('/', function (req, res) {
  res.send('UPDATE request to homepage');
});

router.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});

module.exports = router;
