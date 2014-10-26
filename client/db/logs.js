var mongoose = require('mongoose');
var config = require('../config');
var page = require('./pager');
var log = require('../log');

// var db = mongoose.connect(config.db.mongodb);

var dbLog = {};

// log schema
/*
	{ "_id" : ObjectId("53f1ad57e1793c881cb76794"), "message" : "wechat-ship start s
	uccess at port: 80", "timestamp" : ISODate("2014-08-18T07:37:59.205Z"), "level"
	: "info", "meta" : {  } }
*/
var log_schema = new mongoose.Schema({
	message: String,
	time: { type: Date, default: Date.now, get:formateDate },
	level: String
});

function formateDate (date) {
	if(!date) {
		return date;
	}
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

var model = mongoose.model('log', log_schema);

dbLog.getResult = function (num, message, times, cb) {

	var condition = {};

	if (message && message.length != 0) {
		condition.message = {$regex: message};
	}
	if (times && times.length == 2 && times[0] && times[1]) {
		condition.timestamp = {$gte: times[0], $lte: times[1]};
	}

	var p = new page(num);
	
	var start = (p.num - 1) * p.pageSize;
	model.find(condition).skip(start).limit(p.pageSize).exec(function (err, result) {
		if (err) {
			log.dblog('error', 'find logs err: ' + err);
			cb(1);
		} else {
			cb(null, result);
		}
	});
}

module.exports = dbLog;