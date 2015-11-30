'use strict'

var express = require('express');
var router = express.Router();
var pollCtrl = //reuqire file here//

//routing to an index action
router.get('/', function(req, res, next) {
  res.json({message: 'Hello, World!'});
  next();
});

//routing to a show action
router.get('/:id', function(req, res, next) {
  res.json({message: 'stuff'});
  next();
});

router.get('/', function(req, res) {
  res.json(res.locals.polls);
  res.status(200);
});




router.post('/', function (req, res) {
  res.json('POST request');
});

module.exports = router;
