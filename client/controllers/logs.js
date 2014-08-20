
logsControllers = {};

logsControllers.getList = function(pageno, message, times, cb){

	/*
{ "_id" : ObjectId("53f1ad57e1793c881cb76794"), "message" : "wechat-ship start s
uccess at port: 80", "timestamp" : ISODate("2014-08-18T07:37:59.205Z"), "level"
: "info", "meta" : {  } }
	*/
	//TODO: with db
	cb(null, [{
		title:"1111",
		level:"info",
		message:"wechat",
		timestamp:new Date()
	},{
		title:"222",
		level:"info",
		message:"wechatttt",
		timestamp:new Date()

	}])
}

module.exports = logsControllers;