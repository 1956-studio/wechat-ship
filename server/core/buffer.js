var redis = require("redis");

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
			return;
		}
		client.expire(key, config.redis.expireTime);
	});
}

buffer.get = function(key, cb) {
	client.get(key, function(err, res){
		if(err) {
			log.bufferlog("buffer get error: " + err);
			return cb(error.get("syserr"));
		}else {
			return cb(null, res);
		}
	});
}

buffer.del = function (key) {
	// client.del(key, function (err) {
	// 	cb(err);
	// });
	client.del(key, function (err) {
		if (err) {
			log.bufferlog("buffer del error: " + err + " result:" + res);
		}
	});
}

module.exports = buffer;