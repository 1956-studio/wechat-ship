
userControllers = {};

userControllers.login = function(username, password, cb){
	// TODO: call db to get userinfo
	cb(null, {
		id: "111",
		username: "ltc",
	});
}

userControllers.get = function (id, cb) {
	// TODO: 
	cb(null, {
		id: "111",
		username: "ltc"
	});
}

userControllers.update = function (id, user, cb) {
	// TODO: 
	cb(null);
}


module.exports = userControllers;