
var log = require('../core/log');
var mongoose = require('mongoose');

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
			db.log('error', 'Error save: ' + err);
		}
		if(typeof done === 'function') {
			done(err);
		}
	});
};

mongoose.model('error', ErrorsSchema);

module.exports = ErrorsSchema;