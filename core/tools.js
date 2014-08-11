var request = require("request");
var util = require("util");

var config = require("./config");
var log = require("./log");
var error = require("./error");

var tools = {};

//keys: regex1|regex2 ...
//strings: string that needed to regex
tools.matchKeyWords = function(keys, strings, splitChar){
	var regx_strs = keys.split(splitChar);
	for(var i = 0; i < regx_strs.length; i++){
		if(!regx_strs[i])	//防止多输入了一个分隔符
			continue;
		var regx = new RegExp(regx_strs[i], "i");
		if(regx.test(strings)){
			return regx.exec(strings);
		}
	}
	return false;
}

//url:http://127.0.0.1/path
//data: an object
//cb(err, result)
tools.post = function(url, data, cb) {
	options = {
		method: "POST",
		url: url,
		timeout: config.request.timeout,
		json: data,
	};
	request(options, function(err, req, res){
		if(err) {
			log.toolslog("error", util.format("at tools.post: request url:%s, data: %j, error:%s", 
				url, data, err));
			cb(error.get("syserr", null));
			return;
		}
		return res.body;
	});
}


module.exports = tools;