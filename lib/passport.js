'use strict';
/**REQUIRES
 *	passport
 *	passport-local
 *	bcrypt
 *	user model
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('../models'),
	User = models.User;


/**DEFINITIONS
 *	passport methods:
 *		passport.serializeUser
 *		passport.deserializeUser
 *	objects:
 *		local strategy instance
 *
 */

/**INVOCATIONS
 *	passport.use:
 *		local strategy instance
 *
 */
