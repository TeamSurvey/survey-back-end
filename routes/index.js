var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var bcrypt = require('bcrypt');
var models = require('../models'),
	User = models.User;


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title : (req.user && req.user.localName) || 'Nobody'
	});
});

/**AUTH ROUTES
 *	a login route using `passport.authenticate`
 *	a register route **not using passport**
 *
 */
router.route('/login').
	get(function(req, res, next) {
		res.sendStatus(405);
	}).
	post(passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/'
	}));

router.route('/logout').
	all(function(req, res, next) {
		if(!req.user) {
			var err = new Error("Log in first.");
			return next(err);
		}

		req.logout();
		res.sendStatus(200);
	});

router.route('/changePassword').
	get(function(req, res, next) {
		res.sendStatus(405);
	}).
	put(function(req, res, next) {
		// check that user is logged in
		// check that body contains a password value
		if(!req.body || !req.user || !req.body.password) {
			var err = new Error("No password supplied.");
			return next(err);
		}
		// bcrypt the password
		async.waterfall([
			function(cb) {
				bcrypt.genSalt(16, cb);
			},
			function(salt, cb) {
				bcrypt.hash(req.body.password, salt, cb);
			},
			function(hash, cb) {
				req.user.update({
					localPass : hash
				}).then(function() {
					cb(null);
				}).catch(function(err) {
					cb(err);
				});
			}
		], function(err, result) {
			if(err) {
				return next(err);
			}

			res.sendStatus(200);
		});
		// update the user's database row with the new localPass value
		// send a server response
		
	});

router.route('/signup').
	get(function(req, res, next) {
		res.sendStatus(405);
	}).
	post(function(req, res, next) {
		if(!req.body || !req.body.username || !req.body.password) {
			var err = new Error("No credentials.");
			return next(err);
		}

		async.waterfall([
			function(cb) {
				bcrypt.genSalt(16, cb);
			},
			function(salt, cb) {
				bcrypt.hash(req.body.password, salt, cb);
			},
			function(hash, cb) {
				User.create({
					localName : req.body.username,
					localPass : hash
				}).then(function(user) {
					cb(null, user);
				}, cb);
			}
		], function(err, result) {
			if(err) {
				// students will make error handler
				return next(err);
			}

			res.sendStatus(201);
		});
	});

module.exports = router;
