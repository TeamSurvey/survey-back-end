'use strict'

var express = require('express');
var router = express.Router();
var pollCtrl = require('../controllers/poll.js');


//routing to an index action
router.get('/', pollCtrl.index);

//routing to a show action
router.get('/:id', pollCtrl.read);

//routing to a show action
router.put('/:id', pollCtrl.update);

//routing to a show action
router.delete('/:id', pollCtrl.destroy);

// router.get('/', function(req, res) {
//   res.json(res.locals.polls);
//   res.status(200);
// });

router.post('/', pollCtrl.create);

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
