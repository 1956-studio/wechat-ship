var path = require('path');

config = {
	workdir: path.normalize(process.cwd() + "/..")
};

config.db = {
	mongodb : "mongodb://localhost/ship"
}

config.log = {
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
	app: {
		console:{
			level: "info",
			label: "app"
		},
		file: {
			level: "info",
			filename: "wechat-ship_app.log"
		}
	}
}

config.page = {
	size: 10
}

config.testsever_url = "http://127.0.0.1:8000"

module.exports = config;