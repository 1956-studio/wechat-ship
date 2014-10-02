var mongoose = require('mongoose');
var log = require('../log');

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

RegexSchema.methods.Save = function (cb) {
	this.save(function (err) {
		if(err) {
			log.dblog('error', "Regex Save: " + err);
		}
		if(typeof cb === 'function') {
			cb(err);
		}
	});
}

mongoose.model('regex', RegexSchema);

module.exports = RegexSchema;