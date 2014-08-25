var mongoose = require('mongoose');
var config_db = require('../config');
var db = mongoose.connect(config_db.db.mongodb);
var log = require('../log');

var mongoTemplate = {};

// define the db config schema
var config_schema = new mongoose.Schema({
	redis: {
		host: String,
		port: String,
		pass: String
	},
	session: {
		secret: String,
		resave: Boolean,
		saveUninitialized: Boolean
	},
	timeout: Number
});

var model = mongoose.model('dbconf', config_schema);

// instance the default db config
var default_config = new model({
	redis: {
		host: "localhost",
		port: "6380",
		pass: "redis"
	},
	session: {
		secret: "session",
		resave: false,
		saveUninitialized: false
	},
	timeout: 2000
});

/* test for save db configure
default_config.save(function (err, value) {
	if (err) return console.log(err);

	console.log('success');
});
 */


// save new db config that can be read replace the default config
mongoTemplate.save = function (value, cb) {
	if (value) {
		// TODO the value match the model ?
		var new_config = new model(value);

		new_config.save(function (err, dbvalue) {
			if (err) {
				log.dblog('error', 'db.save ' + err);
				// TODO error cb
				cb(null);
			} else {
				cb(null, dbvalue);
			}
		});
	} else {
		
		default_config.save(function (err, default_value) {
			if (err) {
				log.dblog('error', 'db.save ' + err)
				// TODO error cb
				cb(null);
			} else {
				cb(null, default_value);
			}
		});
	}
}

/* test for find(read) the db config
model.findOne({}, function (err, blog) {
	if (err) return console.log(err);
	console.log('%s %s is a %s.', blog.redis.host, blog.session.secret, blog.timeout);
});
 */

// find the first one matched item by user's id
mongoTemplate.readById = function (id, cb) {
	if (id) {
		var value = model.findById(id, function (err, dbconfig) {

			if (err) {
				log.dblog('error', "db.readOne " + err);

				// TODO error cb
				cb(null);
			} else {
				cb(null, dbconfig);
			}
		});
	} else {
		// TODO error
		cb(null);
	}
}

mongoTemplate.removeById = function (id, cb) {
	if (id) {
		model.findById(id, function (err, result) {
			if (!err && null != result) {
				result.remove();
				cb(null);
			} else {
				// TODO error
				cb(null);
			}
		});
	} else {
		// TODO error
		cb(null);
	}
}

mongoTemplate.read = function (condition, cb) {
	if (condition) {
		model.findOne(condition, function (err, value) {
			if (err) {
				log.dblog('error', 'db.read ' + err);
				// TODO
				cb(null);
			} else {
				cb(null, value);
			}
		});
	} else {
		// TODO
		cb(null);
	}
}

module.exports = mongoTemplate;