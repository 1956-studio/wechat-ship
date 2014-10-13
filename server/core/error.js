var mongoose = require('mongoose');
var errorsSchema = require('../dao/ErrorsDao');
var errosModel = mongoose.model('error');

var error = {}

var errorInfo;

error.init = function(){
	errosModel.find({}, function (err, doc) {
		if(err) {
			console.log(err);
		}else {
			errorInfo = doc;
			console.log('error info init ok!');
		}
		console.log(errorInfo);
	});
}

error.get = function(key) {
	for(var i = 0; i < doc.length; i++) {
		if(errorInfo[i].tag == key) {
			return errorInfo.message;
		}
	}
	return '系统错误';
}

module.exports = error;