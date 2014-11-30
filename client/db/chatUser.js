var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserSchema = new mongoose.Schema({
	openid: {
		type: String,
		require: true
	},
	regTime: {
		type: Date,
		require: true,
		get: getTime
	},
	nickname: {
		type: String
	},
	info: {		/*you can add anything by yourself*/
		type: Schema.Types.Mixed
	}
});

function getTime (date) {
	if(!date) {
		return 'no-date';
	}
	return date.getFullYear() + '-' + (date.getMonth() + 1) + date.getDate()
}

mongoose.model('chatUser', UserSchema);