var winston = require('winston');
require('winston-mongodb').MongoDB;

var log = {};

var logger;

log.init = function() {
	var transports = new Array();

	//general: for debug use
	if(config.log.console) {
		transports.push(new (winston.transports.Console)({ 
			level: config.log.console_level 
		}) );
	}
	logger = new (winston.Logger)({transports: transports});

	//category
	winston.loggers.add("db", config.log.db);
	winston.loggers.add("dao", config.log.dao);
	winston.loggers.add("app", config.log.app);
	winston.loggers.add("tools", config.log.tools);
	winston.loggers.add("api", config.log.api);
	winston.loggers.add("buffer", config.log.buffer);

	//add write logs to mongoDB
	logger.add(winston.transports.MongoDB, config.log.mongo_opt);
}

//for debug use
log.log = function(level, str) {
	if(logger != null) {
		logger.log(level, str);
	}
}

/*
	7 kinds of level:
	silly, debug, verbose, info, warn, error
*/
log.dblog = function(level, str) {
	if(config.log.db != null) {
		winston.loggers.get("db").log(level, "[db] " + str);
	}
	if(level === 'error') {
		console.trace(str);
	}
}

log.daolog = function(level, str) {
	if(config.log.dao != null) {
		winston.loggers.get("dao").log(level, "[dao] " + str);
	}
}

log.applog = function(level, str) {
	if(config.log.app != null) {
		winston.loggers.get("app").log(level, "[app] " + str);
	}
}

log.toolslog = function(level, str) {
	if(config.log.tools != null) {
		winston.loggers.get("tools").log(level, "[tools] " + str);
	}
}

log.apilog = function(level, str) {
	if(config.log.api != null) {
		winston.loggers.get("api").log(level, "[api] " + str);
	}
}

log.bufferlog = function(level, str) {
	if(config.log.buffer != null) {
		winston.loggers.get("buffer").log(level, "[buffer] " + str);
	}
}

//this is user log, should write to mongoDB
log.userlog = function(level, str) {
	if(config.log.user != null) {
		logger.log(level, str);
	}
}


module.exports = log;