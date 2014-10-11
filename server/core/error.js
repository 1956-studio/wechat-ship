

var error = {}

var errorInfo = {}

errorInfo.daoerr = "处理出错了";
errorInfo.syserr = "系统错误";
errorInfo.regerr = "您的账号已经绑定，无法重新绑定";
errorInfo.msgnull = "发送的消息为空";

error.init = function(){
	//TODO: load error msg here
}

error.get = function(key) {
	return eval("errorInfo." + key);
}

module.exports = error;