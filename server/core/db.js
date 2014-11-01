var mongoose = require('mongoose');
var _ = require("underscore");
var async = require('async');

var config = require("../config");
var log = require('./log');
var ListSchema = require('../dao/ListDao');
var RegexSchema = require('../dao/RegexDao');
var ChatUserSchema = require('../dao/ChatUserDao');
var error = require('./error');

var RegexModel = mongoose.model('regex');
var ListModel = mongoose.model('list');
var ChatUserModel = mongoose.model('chatUser');

var db = {};

mongoose.connect(config.mongodb.url);

/******buffer********/
var regex = null;
var list = null;
// var user = null;	// I had done it in user.js! but I forget...TAT
/******buffer********/

// ChatUserModel.find({}, function (err, doc) {
// 	if(err) {
// 		console.log(err);
// 		return cb(err);
// 	}else {
// 		user = doc;
// 	}
// });

db.loadDB = function(cb) {
	if(!cb || typeof cb !== 'function') {
		cb = function() {};
	}
	regex = null;
	list = null;
	async.parallel([
  		function (callback) {
  			db.findRegex(callback);
  		},
  		function (callback) {
  			db.findList(callback);
  		},
  		],
  		function (err) {
  			cb(err);
  		}
  	);
}

// regex
db.findRegex = function(cb) {
	// var results = new Array();
	// results.push({keys:"aaa", cmd: "res.wait('view')"});
	// results.push({keys:"ccc", cmd: "res.wait('view2')"});
	if(regex == null) {
		RegexModel.Find({}, function (err, doc) {
			regex = doc;
			if(err){
				return cb(1);
			}
			return cb(null, doc);
		});
	}else {
		return cb(null, regex);
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
		ListModel.Find({}, function (err, doc) {
			if(err){
				return cb(1);
			}
			list = doc;
			return cb(null, doc);
		});
	}else {
		return cb(null, list);
	}
};

// user
// return: 1 用户已注册，or other info
db.addUser = function (u, cb) {
	ChatUserModel.count({openid: u.openid}, function (err, count) {
		if(err) {
			return cb(error.get('syserr'));
		}
		if(count == 0) {
			return ChatUserModel.createUser(u, cb);
		}else {
			return cb(error.get('regerr'));
		}
	});
}

db.delUser = function (openid, cb) {
	ChatUserModel.remove({openid: openid}, function (err, res) {
		if(err) {
			log.dblog('error', 'db.delUser: ' + err);
			return cb(error.get('syserr'));
		}
		cb(null, res);
	});
}

db.updateUser = function (userObj, cb) {
	ChatUserModel.findOneAndUpdate({openid: userObj.openid}, userObj, function (err, res) {
		if(err) {
			log.dblog('error', 'db.updateUser: ' + err);
			return cb(error.get('syserr'));
		}
		cb(null, res);
	});
}

db.findUser = function (openid, cb) {
	ChatUserModel.findOne({openid: openid}, function (err, res) {
		if(err) {
			log.dblog('error', 'db.findUser: ' + err);
			return cb(error.get('syserr'));
		}
		if(!res) {
			return cb(error.get('nouser'));
		}
		cb(null, res);
	});
}

module.exports = db;