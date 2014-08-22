
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

	var begTime = times[0];
	var endTime = times[1];
	//TODO: with db
	cb(null, {
		logs:[
			{
				title:"1111",
				level:"info",
				message:"wechat",
				timestamp:new Date()
			},
			{
				title:"222",
				level:"info",
				message:"wechatttt",
				timestamp:new Date()
			}
		],
		page:{
			current: 1,	/*当前页数：第current页*/
			size: 10,	/*每页条数*/
			count: 1000,	/*总条数： 共count条*/
			total: 100	/*总页数: 共total页*/
		}
	});
}
	

module.exports = logsControllers;