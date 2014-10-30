
userControllers = {};

userControllers.login = function(username, password, cb){
	if(username == 'admin' && password == '123456'){
		cb(null, {
			id: "111",
			username: "admin",
		});
	}else {
		cb(1);
	}
}

userControllers.get = function (id, cb) {
	// TODO: 
	cb(null, {
		id: "111",
		username: "admin"
	});
}

userControllers.update = function (id, user, cb) {
	// TODO: 
	cb(null);
}


module.exports = userControllers;