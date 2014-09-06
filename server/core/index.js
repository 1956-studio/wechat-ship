var async = require("async");
var wechat = require('wechat');

var dao = require('./dao');
var config = require('./config');
var log = require("./log");
var error = require("./error");
var api = require("./api");
var mysqlapi = require("./mysqlapi");


module.exports.ship = wechat("keyboardcat123").text(function (info, req, res) {console.log(info);
	dao.matchContent(info.Content, function(err, result) {
		if(err) {
			res.reply(err);
		}else if(result != null) {
			eval(result.cmd);
		}else {
			res.reply(config.wechat.default_reply);
		}
	});
}).image(function (info, req, res) {
	//TODO
}).voice(function (info, req, res) {
	//TODO
}).video(function (info, req, res) {
	//TODO
}).location(function (info, req, res) {
  // TODO
}).link(function (info, req, res) {
  // TODO
}).event(function (info, req, res) {
  // TODO
}).middlewarify();


// wechat-ship test API
// POST: /test
// body: {  ToUserName: 'ToUser',
//   FromUserName: 'FromUser',
//   MsgType: 'text',
//   Content: '' ,
//   code: "" -> can't be null
// }
module.exports.test = function (req, res, next) {
	info = {
		ToUserName: req.body.ToUserName || "ToUser",
		FromUserName: req.body.FromUserName || "FromUser",
		MsgType: req.body.MsgType || "text",
		Content: req.body.Content || ""
	};
	res.reply = function (arg) {
		if(typeof arg == "object") {
			res.end("wechat send: " + arg);
		}else if(typeof arg == "string") {
			res.end(arg);
		}else{
			res.end("error reply argument");
		}
	}

	res.wait = function (arg) {
		if(typeof arg == "string") {
			res.end("wechat wait: " + arg);
		}else {
			res.end("error wait argument");
		}
	}

	res.nowait = function (arg) {
		if(typeof arg == "string") {
			res.end("wechat nowait: " + arg);
		}else {
			res.end("error nowait argument");
		}
	}
	if(req.body.Code == null || req.body.Code == "") {
		res.writeHead(404);
		res.end("no code was input");
		return;
	}
	eval(req.body.Code);
};