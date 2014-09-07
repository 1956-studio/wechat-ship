var userController = require("../controllers/user")

var user = {};

// POST: /user/:id
user.update = function (req, res) {
	if(!req.body.password || req.body.password.length != 6) {
		res.writeHead(422);
		res.end("password was too short");
	}
	if(req.body.password != req.body.password2) {
		res.writeHead(422);
		res.end("two password dosen't match");
	}
	userController.update(req.params.id, req.body, function (err) {
		if(err) {
			res.writeHead(404);
			res.end();
		}else {
			res.end();
		}
	})
}

module.exports = user;