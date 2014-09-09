var user = {};

var db = require("./db");

/*
pass into user: {openid, userid}
*/
user.addUser = function (user, cb) {
	process.nextTick(function () {
		db.addUser(user, cb);
	});
}

user.delUser = function (openid, cb) {
	process.nextTick(function () {
		db.delUser(openid, cb);
	});
}

user.updateUser = function (user, cb) {
	process.nextTick(function () {
		db.updateUser(user, cb);
	});
}

user.findUser = function (openid, cb) {
	process.nextTick(function () {
		db.findUser(openid, cb);
	})
}

module.exports = user;