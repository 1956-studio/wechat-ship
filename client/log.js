var winston = require('winston');

var config = require('./config');

var log = {};

log.init = function() {

	// category
	winston.loggers.add("db", config.log.db);
	winston.loggers.add("dao", config.log.dao);
	winston.loggers.add("app", config.log.app);
}


log.dblog = function(level, str) {
	if(config.log.db != null) {
		winston.loggers.get("db").log(level, "[db] " + str);
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


module.exports = log;