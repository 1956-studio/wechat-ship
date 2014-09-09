var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var wechat_ship = require("./core/index");
var config = require("./core/config")
var log = require("./core/log");
var error = require("./core/error");


var dao = require("./core/dao");	//tmp

var app = express();

var List = require("wechat").List 	//tmp


app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.set('port', process.argv[2] || 80);

config.init();
log.init();
error.init();

app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
}));

app.use("/ship", wechat_ship.ship);
app.post("/test", wechat_ship.test);


dao.getList(function(err, results){
	if(err) {
		throw err;
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
		List.add(results[i].key, results[i].items);

	};
});

var server = app.listen(app.get('port'), function() {
  log.applog("info", "wechat-ship start success at port: " + app.get('port'));
});

module.exports = app;