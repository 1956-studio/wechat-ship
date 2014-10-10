var mongoose = require('mongoose');
var log = require('../core/log');

var ListSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	views: [{
			title: String,
			code: String
		}]
});

mongoose.model('list', ListSchema);

module.exports = ListSchema;