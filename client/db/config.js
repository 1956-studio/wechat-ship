var mongoose = require('mongoose');
var log = require('../log');

var ConfigSchema = new mongoose.Schema({
	redis: {
		host: String,
		port: Number,
		pass: String
	},
	session: {
		secret: String,
		resave: Boolean,
		saveUninitialized: Boolean
	},
	mysql: {
		[
			host: String,
			user: String,
			password: String,
			database: String
		]
	},
	timeout: Number
});


mongoose.model('config', ConfigSchema);

module.exports = ConfigSchema;