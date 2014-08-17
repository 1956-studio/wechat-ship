config = {};

config.shipDB = "mongodb://localhost/shipDB";

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

module.exports = config;