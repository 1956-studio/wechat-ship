var log = require('../log');
var mongoose = require('mongoose');
var ErrorsSchema = require('../db/errors');

var ErrorsModel = mongoose.model('error');

var errorsControllers = {};

errorsControllers.create = function (error, cb) {
	if(typeof cb !== 'function') {
		cb = function () {};
	}
	var errorEntity = new ErrorsModel(error);
	errorEntity.Save(cb);
}

errorsControllers.list = function (cb) {
	ErrorsModel.find({}, cb);
}

errorsControllers.delete = function (id, cb) {
	if(typeof cb !== 'function') {
		cb = function () {};
	}
	ErrorsModel.remove({_id: id}, cb);
}

errorsControllers.update = function (error, cb) {
	if(typeof cb !== 'function') {
		cb = function () {};
	}
	ErrorsModel.findOneAndUpdate({_id:error.id}, error, cb);
}
module.exports = errorsControllers;