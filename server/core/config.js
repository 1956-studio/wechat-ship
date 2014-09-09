config = {}

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

config.wechat = {
	default_reply: "系统默认回复"
}

config.mysql = [
{
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : "dljdchat"
},
// {
// 	host     : 'localhost2',
// 	user     : 'user',
// 	password : 'pass',
// 	database : "dljdchat"
// },
]

config.redis = {
	host: "222.26.224.56",
	port: "6379",
	pass: "",
	bufferDB: 2,
	expireTime: 30    // 30 seconds
};

config.session = {
	secret: "aaa",
	resave: true,
	saveUninitialized:true,
}
config.log = {
	console: true,
	console_level: "info",
	mongo_opt:{
		level:"info",
		dbUri:"mongodb://localhost/ship",
		errorTimeout:5000,
		timeout:5000,
	},
	db: {
		console:{
			level: "info",
			label: "db",
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
	app: {
		console:{
			level: "info",
			label: "app"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	},
	tools: {
		console:{
			level: "info",
			label: "tools"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	},
	api: {
		console:{
			level: "info",
			label: "api"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	},
	user: {
		console:{
			level: "info",
			label: "user"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	},
	buffer: {
		console:{
			level: "info",
			label: "buffer"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	},
}

config.request = {
	timeout:3600,
}


config.init = function() {
	//TODO: read config here
}


module.exports = config;