var os = require("os");
var fs = require("fs");
var pm2 = require('pm2');
var path = require("path");
var log = require('../log');

var config = require("../config");

var server = {};

var serverdir = path.join(config.workdir, "/server/app.js");

pm2.connect(function (err) {
	if(err) {
		log.applog('error', 'pm2 connect faild: ' + err);
	}else {
		log.applog('info', 'pm2 connect success');
	}
})

/*
 start several program
 arg: startPort: start program port. ex: 8000, then will start 8000 8001 ... 8000+num
 num: [optional] best equal to os.cups().length
 */
server.startup = function(startPort, num, cb) {
	if (typeof startPort != "number") {
		throw "arg: startPort is not number";
	}
	num = num || os.cpus().length;
	for (var i = 0; i < num; i++, startPort++) {
		pm2.start(config.workdir + '/server.json', {
			name: 'server:' + startPort,
			scriptArgs: [startPort.toString()],
		}, function(err, proc) {
			if (err) {
				log.applog('error', 'pm2 start faild: ' + err);
			}
			if(cb && typeof cb == 'function') {
				cb(err);
			}
		});
	}
}

/*
list: name:
 */
server.list = function(cb) {
	pm2.list(function (err, list) {
		if(err) {
			log.applog('error', 'pm2 List faild: ' + err);
			return cb(err);
		}else {
			var result = new Array(list.length);
			for(var i in list) {
				result[i] = {
					name: list[i].name,
					status: list[i].pm2_env.status,
					pwd: list[i].pm2_env.pm_exec_path
				}
			}
			return cb(null, result);
		}
	});
}

server.stop = function(name, cb) {
	pm2.stop(name, function (err, list) {
		if(err) {
			log.applog('error', 'pm2 List faild: ' + err);
		}
		return cb(err);
	});
}

server.reload = function (name, cb) {
	pm2.sendSignalToProcessName('SIGTERM', name, function (err) {
		if(err) {
			log.applog('error', 'pm2 List faild: ' + err);
		}
		return cb(err);
	});
}

server.restart = function (name, cb) {
	pm2.reload(name, function () {
		if(err) {
			log.applog('error', 'pm2 List faild: ' + err);
		}
		return cb(err);
	});
}


module.exports = server;
