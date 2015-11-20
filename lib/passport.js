'use strict';
/**REQUIRES
 *	passport
 *	passport-local
 *	user model
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('../models');
var User = mongoose.model('User');


/**DEFINITIONS
 *	passport methods:
 *		passport.serializeUser
 *		passport.deserializeUser
 *	objects:
 *		local strategy instance
 *
 */
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id).exec().then(function(user) {
		done(null, user);
	}).catch(function(err) {
		done(err);
	});
});

var localStrat = new LocalStrategy(function(username, password, done) {
	User.findOne({
		userName : username
	}).exec().then(function(user) {
		if(!user) {
			return done(null, false);
		}

		var p = user.comparePassword(password).then(function(match) {
			done(null, match ? user : false);
		});

		return p;
	}).catch(function(err) {
		done(err);
	});
});

/**INVOCATIONS
 *	passport.use:
 *		local strategy instance
 *
 */
passport.use(localStrat);

module.exports = passport;
