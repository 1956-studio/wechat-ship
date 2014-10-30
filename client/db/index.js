var mongoose = require('mongoose');

var config = require('../config');

var db = {};

require('./chatUser');
require('./config');
require('./errors');
require('./list');
require('./logs');
require('./regex');

mongoose.connect(config.db.mongodb);

module.exports = db;