var mongoose = require('mongoose');
var log = require('../core/log');
var error = require('../core/error');

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

RegexSchema.statics.Find = function (conditions, fields, done) {
	if(!fields) {
		this.find(conditions, function (err, doc) {
			if(err) {
				db.log('error', 'Regex Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err, doc);
			}
		});
	}else {
		this.find(conditions, fields, function (err, doc) {
			if(err) {
				db.log('error', 'Regex Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err);
			}
		});
	}
}

mongoose.model('regex', RegexSchema);

module.exports = RegexSchema;