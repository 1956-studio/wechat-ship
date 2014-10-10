var mongoose = require('mongoose');
var _ = require("underscore");

var log = require('./log');
var ListSchema = require('../dao/ListDao');
var RegexSchema = require('../dao/RegexDao');
var UserSchema = require('../dao/UserDao');

var RegexModel = mongoose.model('regex');
var ListModel = mongoose.model('list');
var UserModel = mongoose.model('user');

var db = {};

mongoose.connect(config.db.mongodb);

/******buffer********/
var regex = null;
var list = null;
var user = null;
/******buffer********/

UserModel.find({}, function (err, doc) {
	if(err) {
		console.log(err);
		return cb(err);
	}else {
		user = doc;
	}
});

// regex
db.findRegex = function(cb) {
	// var results = new Array();
	// results.push({keys:"aaa", cmd: "res.wait('view')"});
	// results.push({keys:"ccc", cmd: "res.wait('view2')"});
	if(regex == null) {
		RegexModel.find({}, function (err, doc) {
			regex = doc;
			cb(err, doc);
		});
	}else {
		cb(null, regex);
	}
};

// list
db.findList = function(cb) {
	// var results = new Array();
	// result1 = {
	// 	key: "view",
	// 	views: [
	// 		{key: "reply {a} look my name", val: "res.nowait('ltc')"},
	// 		{key: "reply {b} look my age", val: "res.reply('22')"}
	// 	],
	// }
	// result2 = {
	// 	key: "view2",
	// 	views: [
	// 		{key: "reply {a} look my name222", val: "res.nowait('ltc222')"},
	// 		{key: "reply {b} look my age222", val: "res.reply('22222')"}
	// 	],
	// }
	// results.push(result1);
	// results.push(result2);
	
	if(list == null) {
		ListModel.find({}, function (err, doc) {
			list = doc;
			cb(err, doc);
		});
	}else {
		cb(null, list);
	}
};

// user
db.addUser = function (u, cb) {
	UserModel.count({openid: u.openid}, function (err, count) {
		if(!err && count == 0) {
			UserModel.createUser(u, cb);
			if(user) {
				user.push(u);
			}
		}else {
			cb(1);
		}
	});
}

db.delUser = function (openid, cb) {
	UserModel.remove({openid: openid}, function (err) {
		if(err) {
			return cb(err);
		}
	});
	for(var i in user) {
		if(user[i].openid === openid) {
			[].splice.call(user, i, 1);
			return cb();
		}
	}
}

db.updateUser = function (userEntity, cb) {
	UserModel.findOneAndUpdate({openid: userEntity.openid}, userEntity, cb);
}

db.findUser = function (openid, cb) {
	if(user != null) {
		cb(null, _.findWhere(user, {openid: openid}));
	}else {
		console.log('error');
		cb(1);
	}
}

module.exports = db;