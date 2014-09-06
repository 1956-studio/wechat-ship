var request = require("request");
var config = require("../config");

var test = {};

// GET: /test
test.index = function (req, res) {
	res.render("test/index");
}

// POST /test
test.exec = function (req, res) {
	request.post({
			url: config.testsever_url,
			form: {
				ToUserName: req.body.tousername,
				FromUserName: req.body.fromusername,
				MsgType: req.body.msgtype,
				Content: req.body.content,
				Code: req.body.code
			}
		}, 
		function (err, r, body) {
			res.render("test/index", {result: body});
	});
}

module.exports = test;