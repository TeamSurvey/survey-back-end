'use strict'

var express = require('express');
var router = express.Router();

var pollCtrl = require('../controllers/poll.js');

router.get('/', pollCtrl.index);

router.post('/', pollCtrl.create);

router.get('/:id', pollCtrl.read);

router.put('/:id', pollCtrl.update);

router.delete('/:id', pollCtrl.destroy);

module.exports = router;
