'use strict';
// configure sequelize and import other models

var Sequelize = require('sequelize');
//var sequelize = new Sequelize(...);

var models = {
	'sequelize' : sequelize,
	User : sequelize.import('./User')
};

module.exports = models;
