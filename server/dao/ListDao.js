var mongoose = require('mongoose');
var log = require('../core/log');
var error = require('../core/error');

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

ListSchema.statics.Find = function (conditions, done) {
	var args = [].slice.call(arguments);
	var fields;
	if(args.length == 3) {
		fields = args[1];
		done = args[2];
	}
	
	if(!fields) {
		this.find(conditions, function (err, doc) {
			if(err) {
				db.log('error', 'List Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err, doc);
			}
		});
	}else {
		this.find(conditions, fields, function (err, doc) {
			if(err) {
				db.log('error', 'List Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err);
			}
		});
	}
}

mongoose.model('list', ListSchema);

module.exports = ListSchema;