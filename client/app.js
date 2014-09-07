var express = require('express');
var exphbs  = require('express-handlebars');
var session = require("express-session");
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var log = require('./log');
var config = require("./config");
var userControllers = require('./controllers/user');
var auth = require('./auth')

var app = express();

// view engine setup
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
		list:function (context, options) {
			var ret = "";
			for(var i=0, j=context.length; i<j; i++) {
			    ret = ret + options.fn(context[i]);
			}
			return ret;
		}
	}
}));
app.set('view engine', 'handlebars');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}))
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(__dirname + '/public'));

//config of login auth
app.use(auth.passport());

auth.serial = function (username, password, done) {
	userControllers.login(username, password, function (err, res) {
		process.nextTick(function () {
			done(err, res);
		});
	});
}

auth.deserial = function (user, done) {
	done(null, user);
}

auth.noLogin = function (req, res, next) {
	res.redirect('/login');
}
//config finish

app.use('/', routes);

// app.enable('view cache');

/// enable when become production
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


app.set('port', process.env.PORT || 3000);

log.init();

var server = app.listen(app.get('port'), function() {
	log.applog("info", "web application start at port: " + app.get('port'));
});

module.exports = app;
