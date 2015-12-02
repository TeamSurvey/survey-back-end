'use strict'

var express = require('express');
var router = express.Router();
var pollCtrl = require('../controllers/poll.js');
var pollAnswerCtrl = require('../controllers/pollAnswer.js');

router.get('/', pollCtrl.index);

router.post('/', pollAnswerCtrl.create);

router.get('/:id', pollAnswerCtrl.read);

module.exports = router;
