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
	console.log(req.body);

	if(req.body.code == null || req.body.code == "") {
		res.writeHead(404);
		res.end("no code was input");
		return;
	}
	eval(req.body.code);
};