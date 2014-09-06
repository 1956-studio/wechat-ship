var os = require("os");
var fs = require("fs");
var forever = require("forever");
var path = require("path");

var config = require("../config");

var server = {};

var serverdir = path.join(config.workdir, "/server/app.js");
var logdir = "/tmp/wechat_server";

/*
 start several program
 arg: startPort: start program port. ex: 8000, then will start 8000 8001 ... 8000+nums
 nums: [optional] best equal to os.cups().length
 */
server.startup = function(startPort, nums){
	try{
		fs.mkdirSync(logdir);
	}catch(e){
		/*do nothing*/
	}
	if(typeof startPort != "number"){
		throw "arg: startPort is not number";
	}
	if(nums && typeof nums != "number") {
		throw "arg: nums is not number";
	}
	nums = nums || os.cpus().length
	for(var i = 0; i < nums; i++){
		forever.startDaemon(serverdir, {
			logFile: logdir + "/all.log",
			pidFile: logdir + "/server.pid",
			options: [startPort++]
		});
	}
}

server.list = function(cb) {
	forever.list(false, cb);
}

server.stop = function(index, cb) {
	var runner = forever.stop(index);
	runner.on('stop', function (processes) {
		cb(null, processes);
	});
	runner.on('error', function(err){
		cb(err);
	});
}

server.stopAll = function(cb) {
	var runner = forever.stopAll(false);
	runner.on('stopAll', function (processes) {
		cb(null, processes);
	});
	runner.on('error', function(err){
		cb(err);
	});
}

server.restartAll = function(cb) {
	var runner = forever.restartAll(false);
	runner.on('restartAll', function(processes){
		cb(null, processes);
	});
	runner.on('error', function(err){
		cb(err);
	});
}

module.exports = server;
