var domain = require('domain');
var cluster = require('module');
var async = require("async");
var http = require('http');
var wechat = require('wechat');

var dao = require('./dao');
var log = require("./log");
var error = require("./error");
var api = require("./api");
var mysqlapi = require("./mysqlapi");

if (cluster.isMaster) {
	cluster.fork();
	console.log('fork new process');
	cluster.on('disconnect', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' disconnect');
		cluster.fork();
	});
} else {
	var domain = require('domain');
	http.createServer(function(req, res) {
		var d = domain.create();
		d.on('error', function(er) {
			console.log('on error');
			server.close();
			cluster.worker.disconnect();
			res.statusCode = 500;
			res.end(er.stack);
		});
		d.add(req);
		d.add(res);
		d.run(function() {
			handleRequest(req, res);
		});
	}).listen(8000);
}

var handleRequest = function(req, res) {
	if (req.method != 'POST') {
		res.writeHead(404);
		res.end();
		return;
	}
	req.on('data', function(data) {
		data = data.toString();
		var dataObj;
		try {
			dataObj = JSON.parse(data);
		} catch (e) {
			res.writeHead(404);
			res.end();
			return;
		}
		info = {
			ToUserName: dataObj.ToUserName || "ToUser",
			FromUserName: dataObj.FromUserName || "FromUser",
			MsgType: dataObj.MsgType || "text",
			Content: dataObj.Content || ""
		};
		if (dataObj.Code == null || dataObj.Code == "") {
			res.writeHead(404);
			res.end("no code was input");
			return;
		}
		res.reply = function(arg) {
			if (typeof arg == "object") {
				res.end("wechat send: " + arg);
			} else if (typeof arg == "string") {
				res.end(arg);
			} else {
				res.end("error reply argument");
			}
		}

		res.wait = function(arg) {
			if (typeof arg == "string") {
				res.end("wechat wait: " + arg);
			} else {
				res.end("error wait argument");
			}
		}

		res.nowait = function(arg) {
			if (typeof arg == "string") {
				res.end("wechat nowait: " + arg);
			} else {
				res.end("error nowait argument");
			}
		}
		eval(dataObj.Code);
	});
}