var request = require("request");
var util = require("util");

var config = require("./config");
var log = require("./log");
var error = require("./error");
var tools = require("./tools");

var api = {};

//url:http://127.0.0.1/path
//data: an object
//cb(err, result)
api.post = function(url, data, cb) {
	options = {
		method: "POST",
		url: url,
		timeout: config.request.timeout,
		json: data,
	};
	request(options, function(err, req, res){
		if(err) {
			log.toolslog("error", util.format("at api.post: request url:%s, data: %j, error:%s", 
				url, data, err));
			cb(error.get("syserr", null));
			return;
		}
		return res.body;
	});
}


module.exports = api;