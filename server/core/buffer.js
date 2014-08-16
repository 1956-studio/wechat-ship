var redis = require("redis");

var config = require("./config");
var log = require("./log");
var error = require("./error");

buffer = {};

var client = redis.createClient(config.redis.port, config.redis.host, {
	auth_pass: config.redis.pass,
});

client.select(config.redis.bufferDB);

buffer.set = function(key, val) {
	client.set(key, val, function(err, res){
		if (err || res != "OK") {
			log.bufferlog("buffer set error: " + err + " result:" + res);
		}
	});
}

buffer.get = function(key, cb) {
	client.get(key, function(err, res){
		if(err) {
			log.bufferlog("buffer get error: " + err);
			cb(error.get("syserr"));
		}else {
			cb(null, res);
		}
	});
}

module.exports = buffer;