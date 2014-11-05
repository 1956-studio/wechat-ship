var mongoose = require('mongoose');
var logsModel = mongoose.model('log');
var config = require('../config');

logsControllers = {};

//search logs
//page: not decide
//message: logs' message
//times(array): times[0]:begin time, times[1]: end time
logsControllers.getList = function(page, message, times, cb){

	/*
{ "_id" : ObjectId("53f1ad57e1793c881cb76794"), "message" : "wechat-ship start s
uccess at port: 80", "timestamp" : ISODate("2014-08-18T07:37:59.205Z"), "level"
: "info", "meta" : {  } }
	*/

	if(times[0] && times[1] && times[0] != '' && times[1] != '') {
		var m_times = new Array(2);
		try{
			m_times[0] = new Date(times[0]);
			m_times[1] = new Date(times[1]);
		}catch(e){
			// do nothing
		}
	}
	if(!page || typeof page !== 'number') {
		page = 1;
	}
	logsModel.getResult(page, message, m_times, cb);

}


module.exports = logsControllers;