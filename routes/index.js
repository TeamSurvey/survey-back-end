var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**AUTH ROUTES
 *	a login route using `passport.authenticate`
 *	a register route **not using passport**
 *
 */


module.exports = router;
