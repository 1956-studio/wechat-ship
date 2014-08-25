var mongoose = require('mongoose');
var config = require('../config');
var page = require('pager');

var db = mongoose.connect(config.db.mongodb);

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

dbLog.getResult = function (num, message, times, cb) {
	var page = new page(num);

	var start = (page.num - 1) * page.pageSize;

	var condition = {
		message: message,
		time: { 
			$and : [
					{$gt : times[0]}, 
					{$lt : times[1]}
				]}
	}

	model.find(condition).skip(start).limit(page.pageSize).exec(function (err, result) {
		if (err) {
			// TODO error cb
			cb(null);
		} else {
			cb(null, result);
		}
	});
}

module.exports = dbLog;