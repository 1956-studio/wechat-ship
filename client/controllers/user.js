var db =  require("../db/db");

userControllers = {};

userControllers.login = function(username, password, cb){
	//TODO:call db to get userinfo
	cb(null, {
		id: "111",
		username: "ltc",
	});
}

module.exports = userControllers;