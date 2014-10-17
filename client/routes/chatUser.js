var userController = require("../controllers/user")

var chatUser = {};

chatUser.index = function (req, res) {
	console.log('hello');
	res.end();
}

module.exports = chatUser;