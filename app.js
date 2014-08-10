var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var index = require("./core/index");
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

/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.use("/", index)


dao.getList(function(err, results){
	if(err) {
		throw err;
	}
	for (var i = 0; i < results.length; i++) {
		console.log(results[i].list);
		List.add(results[i].key, results[i].list);
	};
})

var server = app.listen(app.get('port'), function() {
  log.applog("info", "wechat-ship start success at port: " + app.get('port'));
});


module.exports = app;

