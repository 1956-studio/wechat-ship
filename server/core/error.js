var mongoose = require('mongoose');
var errorsSchema = require('../dao/ErrorsDao');
var errosModel = mongoose.model('error');

var error = {}

var errorInfo;

var defaultError = new Array();
defaultError.push(new errosModel({tag: 'syserr', message: '系统错误'}));
defaultError.push(new errosModel({tag: 'msgnull', message: '消息为空'}));
defaultError.push(new errosModel({tag: 'regerr', message: '已经注册过了'}));

error.init = function(){
	errosModel.Find({}, function (err, doc) {
		if(err) {
			return console.log(err);
		}else if(!doc || doc.length == 0) {
			for(var i in defaultError) {
				defaultError[i].Save();
			}
			doc = defaultError;
		}
		else {
			errorInfo = doc;
			console.log('error info init ok!');
		}
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