var async = require("async");
var wechat = require('wechat');

var dao = require('./dao');
var config = require('./config');
var log = require("./log");
var error = require("./error");
var api = require("./api");
var mysqlapi = require("./mysqlapi");


module.exports = wechat("").text(function (info, req, res) {
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