var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var log = require('../core/log');
var error = require('../core/error');

var ChatUserSchema = new mongoose.Schema({
	openid: {
		type: String,
		require: true
	},
	regTime: {
		type: Date,
		require: true
	},
	info: {		/*you can add anything by yourself*/
		type: Schema.Types.Mixed
	}
});

ChatUserSchema.methods.Save = function(done) {
	this.save(function (err) {
		if(err) {
			db.log('error', 'chatUser Save: ' + err);
			err = error.get('syserr');
		}
		if(typeof done === 'function') {
			done(err);
		}
	});
};

/*
 * @param user{Object]
*/
ChatUserSchema.statics.createUser = function (user, done) {
	var Schema = this;
	var model = new Schema(user);
	return model.Save(done);
}


mongoose.model('chatUser', ChatUserSchema);

module.exports = ChatUserSchema;