var mongoose = require('mongoose');

var chatUserModel = mongoose.model('chatUser');

var chatUserController = {};

chatUserController.list = function (cb) {
	chatUserModel.find({}, function (err, doc) {
		if(err) {
			log.dblog('error', 'chatUserController list: ' + err);
			return cb(err);
		}
		cb(null, doc);
	});
}

chatUserController.getObject = function (id, cb) {
	chatUserModel.findById(id, function (err, doc) {
		if(err) {
			log.dblog('error', 'chatUserController detail: ' + err);
			return cb(err);
		}
		cb(null, doc);
	});
}

chatUserController.updateObject = function (chatUser, cb) {
	chatUserModel.findByIdAndUpdate(chatUser.id, function (err) {
		if(err) {
			log.dblog('error', 'chatUserController updateObject: ' + err);
			return cb(err);
		}
		cb(null);
	});
}

chatUserController.deleteObject = function (id, cb) {
	chatUserModel.findByIdAndRemove(id, function (err) {
		if(err) {
			log.dblog('error', 'chatUserController deleteObject: ' + err);
			return cb(err);
		}
		cb(null);
	});
}

module.exports = chatUserController;