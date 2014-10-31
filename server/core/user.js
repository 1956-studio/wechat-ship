var buffer = require("./buffer");
var db = require("./db");
var error = require("./error");

var user = {};

function cache (user) {
	buffer.set("user" + user.openid, user);
}

function delCache (openid) {
	buffer.del("user" + openid);
}

user.addUser = function (user, cb) {
	process.nextTick(function () {
		db.addUser(user, function (err) {
			if(err) {
				return cb(err);
			}
			cache(user);
			return cb(null);
		});
	});
}

user.delUser = function (openid, cb) {
	delCache(openid);
	process.nextTick(function () {
		db.delUser(openid, cb);
	});
}

user.updateUser = function (user, cb) {
	delCache(user.openid);
	process.nextTick(function () {
		db.updateUser(user, cb);
	});
}

user.findUser = function (openid, cb) {
	// cache the user info
	buffer.get(openid, function (err, result) {
		if(err) {	
			return cb(error.get('syserr'), null);
		}
		if(result) {
			return cb(null, result);	// cache hit
		}
		process.nextTick(function () {
			db.findUser(openid, function (err, result) {
				if(err){
					return cb(err);
				}
				cache(result);
				return cb(null, result);
			});
		});
	});
}

module.exports = user;