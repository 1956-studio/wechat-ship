

var error = {}

var errorInfo = {}

errorInfo.daoerr = "处理出错了"
errorInfo.syserr = "系统错误"

error.init = function(){
	//TODO: load error msg here
}

error.get = function(key) {
	return eval("errorInfo." + key);
}

module.exports = error;