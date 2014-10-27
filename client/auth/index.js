var auth = {};

// const variable
var _AUTHFAILD = 1;
var _NOLOGIN = 2;


/*
auth.serial = function (username, password, done) {
	AuthUser(username, password, function(err, res) {
		process.nextTick(function(){
			done(err, res);	// res will store in session
		});
	});
}
*/
auth.serial = null;

/*
auth.deserial = function (user, done) {
	done(null, user);	// or find user entity
}
*/
auth.deserial = null;
auth.noLogin = null;

auth.passport = function () {
	return function (req, res, next) {

		req.isAuth = (req.session.user != null);

		req.getUser = function (cb) {
			if(req.isAuth) {
				auth.deserial(req.session.user, function (err, res) {
					if(err) {
						cb(err, null);
					}else {
						cb(null, res);
					}
				})
			}else {
				cb(_NOLOGIN, null);
			}
		}

		req.login = function (username, password, done) {
			auth.serial(username, password, function (err, user) {
				if(err) {
					done(err);
					return;
				}
				if(user == null) {
					done(_AUTHFAILD);
					return;
				}
				req.session.user = user;
				done(null);
				
			});
		}

		req.logout = function (done) {
			req.session.user = null;
			done(null);
		}

		next();
	}
}



auth.Auth = function (req, res, next) {
	if(req.isAuth) {
		next();
	}else {
		if(auth.noLogin && typeof auth.noLogin == 'function') {
			auth.noLogin(req, res, next);
		}else {
			res.writeHead(404);
			res.end("no login");
		}
	}
}

module.exports = auth;
