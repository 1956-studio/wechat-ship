var chatUserController = require("../controllers/chatUser");

var chatUser = {};

// GET: /chatUser
chatUser.index = function (req, res) {
	chatUserController.list(function (err, result) {
		if(err) {
			res.writeHead(404);
			res.end(err);
		}else {
			var ret_results = {};
			ret_results.headTitle = "chat user";
			ret_results.chatUser = result;
			res.render('chatUser/index', ret_results);
		}
	});
}

// GET: /chatUser/:id
chatUser.detail = function (req, res) {
	chatUserController.getObject(req.params.id, function (err, result) {
		if(err || result == null) {
			res.writeHead(404);
			res.end(err);
		}else {
			console.log('ok', result);
			result.headTitle = "chatUser - detail";
			res.render("chatUser/detail", result);
		}
	})
}

// POST: /chatUser/:id
chatUser.update = function (req, res) {
	chatUserController.updateObject(req.body, function (err) {
		if(err) {
			res.writeHead(404);
			res.end();
			return;
		}
		res.redirect("/chatUser/detail/" + req.body.id);
	});
}

// DELETE: /chatUser/{{id}}
chatUser.delete = function (req, res) {
	chatUserController.deleteObject(req.params.id, function (err) {
		if(err) {
			res.writeHead(404);
			res.end();
			return;
		}
		req.method = 'GET';
		chatUser.index(req, res);
	})
	
}

module.exports = chatUser;