var mongoose = require('mongoose');

var config = require('../config');

var db = {};

mongoose.connect(config.db.mongodb);

module.exports = db;