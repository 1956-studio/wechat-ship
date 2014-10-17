var mongoose = require('mongoose');
var log = require('../core/log');
var error = require('../core/error');

var ErrorsSchema = new mongoose.Schema({
	tag:{
		type:String,
		require:true
	},
	message:{
		type:String,
		require:true
	}
});

ErrorsSchema.methods.Save = function(done) {
	this.save(function (err) {
		if(err) {
			db.log('error', 'Errors Save: ' + err);
			err = error.get('dbError');
		}
		if(typeof done === 'function') {
			done(err);
		}
	});
};

ErrorsSchema.statics.Find = function (conditions, done) {
	var args = [].slice.call(arguments);
	var fields;
	if(args.length == 3) {
		fields = args[1];
		done = args[2];
	}

	if(!fields) {
		this.find(conditions, function (err, doc) {
			if(err) {
				db.log('error', 'Errors Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err, doc);
			}
		});
	}else {
		this.find(conditions, fields, function (err, doc) {
			if(err) {
				db.log('error', 'Errors Find: ' + err);
				err = error.get('dbError');
			}
			if(typeof done === 'function') {
				done(err, doc);
			}
		});
	}
}

mongoose.model('error', ErrorsSchema);

module.exports = ErrorsSchema;