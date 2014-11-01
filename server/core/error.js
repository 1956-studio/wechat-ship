var mongoose = require('mongoose');
var errorsSchema = require('../dao/ErrorsDao');
var errosModel = mongoose.model('error');

var error = {}

var errorInfo;

var defaultError = new Array();
defaultError.push(new errosModel({tag: 'syserr', message: '系统错误'}));
defaultError.push(new errosModel({tag: 'msgnull', message: '消息为空'}));
defaultError.push(new errosModel({tag: 'regerr', message: '已经注册过了'}));
defaultError.push(new errosModel({tag: 'nouser', message: '没有找到这个用户'}));

error.init = function(cb){
	errorInfo = null;
	if(!cb || typeof cb !== 'function') {
		cb = function () {};
	}
	errosModel.Find({}, function (err, doc) {
		if(err) {
			cb(err);
			return console.log(err);
		}else if(!doc || doc.length == 0) {
			for(var i in defaultError) {
				defaultError[i].Save();
			}
			errorInfo = defaultError;
		}
		else {
			errorInfo = doc;
			console.log('error info init ok!');
		}
		cb()
	});
	
	
}

error.get = function(key) {
	if(!errorInfo) {
		return '系统错误';
	}
	for(var i = 0; i < errorInfo.length; i++) {
		if(errorInfo[i].tag == key) {
			return errorInfo[i].message;
		}
	}
	return '系统错误';
}

module.exports = error;