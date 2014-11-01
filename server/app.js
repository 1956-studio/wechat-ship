var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var async = require('async');

var config = require("./config");
var wechat_ship = require("./core/index");
var log = require("./core/log");
var error = require("./core/error");
var db = require('./core/db');


var dao = require("./core/dao");	//tmp

var app = express();

var List = require("wechat").List 	//tmp


app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.set('port', process.argv[2] || 80);

log.init();
error.init();
loadList();

app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
}));

app.use(express.query());
app.use("/ship", wechat_ship.ship);


function loadList (cb) {
	if(!cb || typeof cb !== 'function') {
		cb = function() {};
	}
	dao.getList(function(err, results){
		if(err) {
			return cb(err);
		}
		// List.add('view', [
		//   ['回复{a}查看我的性别', function (info, req, res) {
		//     res.reply('我是个妹纸哟');
		//   }],
		//   ['回复{b}查看我的年龄', function (info, req, res) {
		//     res.reply('我今年18岁');
		//   }],
		//   ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
		// ]);
		for (var i = 0; i < results.length; i++) {
			List.add(results[i].name, results[i].items);
		};
		console.log('List init ok!');
		cb(null);
	});
}


var server = app.listen(app.get('port'), function() {
  log.applog("info", "wechat-ship start success at port: " + app.get('port'));
});

process.on('SIGTERM', function(msg) {
	log.applog("info", "wechat-ship beginning to reload...");
	async.series([
			function(callback) {
				error.init(callback);
			},
			function(callback) {
				db.loadDB(callback);
			},
			function(callback) {
				loadList(callback);
			}
		],
		function(err) {
			if (err) {
				log.applog("error", "wechat-ship reload faild...");
			} else {
				log.applog("info", "wechat-ship reload success...");
			}
		}
	);
});

module.exports = app;