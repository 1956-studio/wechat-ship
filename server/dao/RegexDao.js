var mongoose = require('mongoose');
var log = require('../core/log');

var RegexSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	regex: {
		type: String,
		require: true
	},
	code: {
		type: String,
		require: true
	}
});

mongoose.model('regex', RegexSchema);

module.exports = RegexSchema;