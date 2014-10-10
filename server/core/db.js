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
// var user = null;	// I had done it in user.js! but I forget...TAT
/******buffer********/

// UserModel.find({}, function (err, doc) {
// 	if(err) {
// 		console.log(err);
// 		return cb(err);
// 	}else {
// 		user = doc;
// 	}
// });

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
		}else {
			cb(1);
		}
	});
}

db.delUser = function (openid, cb) {
	UserModel.remove({openid: openid}, cb);
}

db.updateUser = function (userObj, cb) {
	UserModel.findOneAndUpdate({openid: userObj.openid}, userObj, cb);
}

db.findUser = function (openid, cb) {
	UserModel.findOne({openid: openid}, cb);
}

module.exports = db;