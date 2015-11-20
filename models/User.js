'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// export a mongoose model

var userSchema = new Schema({
	userName : String,
	passwordDigest : String
});

userSchema.virtual('password').set(function(password) {
	var self = this;

	var saltPromise = new Promise(function saltExec(res, rej) {
		bcrypt.genSalt(16, function(err, salt) {
			if(err) {
				rej(err);
				return;
			}

			res(salt);
		});
	});

	var returnedPromise = saltPromise.then(function(salt) {
		return new Promise(function hashExec(res, rej) {
			bcrypt.hash(password, salt, function(err, digest) {
				if(err) {
					rej(err);
					return;
				}

				res(digest);
			});
		});
	}).then(function(digest) {
		self.passwordDigest = digest;
	});

	return returnedPromise;
});

module.exports = userSchema;
