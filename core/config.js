config = {}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

config.redis = {
	host: "localhost",
	port: "6379",
	pass: "",
};

config.session = {
	secret: "aaa",
	resave: true,
	saveUninitialized:true,
}

config.log = {
	console: true,
	console_level: "info",
	db: {
		console:{
			level: "info",
			label: "db"
		},
		file: {
			level: "info",
			filename: "wechat-ship_db.log",
		}
	},
	dao: {
		console:{
			level: "info",
			label: "dao"
		},
		file: {
			level: "info",
			filename: "wechat-ship_dao.log"
		}
	},
}

config.init = function() {
	//TODO: read config here
}
module.exports = config;