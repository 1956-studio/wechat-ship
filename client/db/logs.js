var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var config = require('../config');
var log = require('../log');

// var db = mongoose.connect(config.db.mongodb);

// log schema
/*
	{ "_id" : ObjectId("53f1ad57e1793c881cb76794"), "message" : "wechat-ship start s
	uccess at port: 80", "timestamp" : ISODate("2014-08-18T07:37:59.205Z"), "level"
	: "info", "meta" : {  } }
*/
var LogSchema = new mongoose.Schema({
	message: String,
	time: {
		type: Date,
		default: Date.now,
		get: formateDate
	},
	level: String
});

function formateDate(date) {
	if (!date) {
		return date;
	}
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

LogSchema.plugin(mongoosePaginate);


LogSchema.statics.getResult = function(num, message, times, cb) {

	var condition = {};

	if (message && message.length != 0) {
		condition.message = {
			$regex: message
		};
	}
	if (times && times.length == 2) {
		if (times[0] || times[1]) {
			condition.timestamp = {};
		}
		if (times[0]) {
			condition.timestamp['$gte'] = times[0];
		}
		if (times[1]) {
			condition.timestamp['$lte'] = times[1];
		}
	}

	function paginateCallback(err, pageCount, paginatedResults, itemCount) {
		if (err) {
			log.dblog('error', 'logs paginate ' + err);
			return cb(1);
		}
		var page = {
			total: pageCount,
			/*总页数: 共total页*/
			count: itemCount, /*总条数： 共count条*/
			current: num
		};
		return cb(null, paginatedResults, page);
	}

	this.paginate(condition, num, config.page.size,  paginateCallback, {sortBy: { time: -1}});
}


mongoose.model('log', LogSchema);
