var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserSchema = new mongoose.Schema({
	openid: {
		type: String,
		require: true
	},
	regTime: {
		type: Date,
		require: true
	},
	nickname: {
		type: String
	},
	info: {		/*you can add anything by yourself*/
		type: Schema.Types.Mixed
	}
});


mongoose.model('chatUser', UserSchema);

module.exports = UserSchema;