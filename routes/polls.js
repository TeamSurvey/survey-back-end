'use strict'

var express = require('express');
var router = express.Router();

//routing to an index action
router.get('/', function(req, res, next) {
  res.json({message: 'Hello, World!'});
});

//routing to a show action
router.get('/:id', function(req, res, next) {
  res.json({message: 'stuff'});
});

module.exports = router;
