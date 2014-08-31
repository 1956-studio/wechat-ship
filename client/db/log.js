var mongoose = require('mongoose');
var config = require('../config');
var page = require('./pager');

var db = mongoose.connect(config.db.log.mongodb);

var dbLog = {};

// log schema
/*
	{ "_id" : ObjectId("53f1ad57e1793c881cb76794"), "message" : "wechat-ship start s
	uccess at port: 80", "timestamp" : ISODate("2014-08-18T07:37:59.205Z"), "level"
	: "info", "meta" : {  } }
	*/
var log_schema = new mongoose.Schema({
	message: String,
	time: { type: Date, default: Date.now },
	level: String
});

var model = mongoose.model('log', log_schema);

// function getCondition(condition, message, times, num, cb) {
// 	if (message.length === 0 || message) {
		
// 	} else {
// 		condition.message = message;
// 	}

// 	if (times.length != 2 || times) {
		
// 	} else {
// 		condition.startDate = times[0];
// 		condition.endDate = times[1];
// 	}

// // condtion = {
// // 	message: message,
// // 	startDate: startDate,
// // 	endDate: endDate
// // }

// // {message: "hello", timestamp: {$gt: startDate, $lt: endDate}}

// 	cb(condition, num, callback);
// }

dbLog.getResult = function (num, message, times, cb) {

	var condition = {};

	if (message.length === 0 || message) {
		
	} else {
		condition.message = message;
	}

	if (times.length != 2 || times) {
		
	} else {
		condition.startDate = times[0];
		condition.endDate = times[1];
	}

	var page = new page(num);

	var start = (page.num - 1) * page.pageSize;

	var cond = {
		message: condition.message, 
		timestamp: {$gt: condition.startDate, $lt: condition.endDate}
	}

	model.find(cond).skip(start).limit(page.pageSize).exec(function (err, result) {
		if (err) {
			// TODO error cb
			cb(null);
		} else {
			cb(null, result);
		}
	});

	// getCondition(condition, message, times, num, function (condition, num, cb) {
	// 	var page = new page(num);

	// 	var start = (page.num - 1) * page.pageSize;

	// 	var cond = {
	// 		message: condition.message, 
	// 		timestamp: {$gt: condition.startDate, $lt: condition.endDate}
	// 	}

	// 	model.find(cond).skip(start).limit(page.pageSize).exec(function (err, result) {
	// 		if (err) {
	// 			// TODO error cb
	// 			cb(null);
	// 		} else {
	// 			cb(null, result);
	// 		}
	// 	});
	// });
}

module.exports = dbLog;