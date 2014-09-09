var request = require("request");

var config = require("../config");
var log = require("../log");

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
			},
			timeout: 5000	// 5 seconds timeout
		}, 
		function (err, r, body) {
			if(err) {
				log.applog("error", "error in: test[test.exec] " + err);
				res.writeHead(404);
				res.end();
				return;
			}
			res.end(body);
	});
}

module.exports = test;