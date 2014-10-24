mysqlapi = {};

var mysql = require("mysql");

var log = require("./log");

var mysqlPool;
if(config.mysql){
	mysqlPool = new Array();
	log.apilog("mysql init...");
	init();
}

function init(){
	mysqldb = config.mysql;
	if(!mysqldb)
		return;

	for(var i = 0; i < mysqldb.length; i++){		
		var pool  = mysql.createPool(mysqldb[i]);
		mysqlPool.push(pool);
	}
	log.apilog("mysql init success!");
}

mysqlapi.getPool = function(no){
	if(mysqlPool){
		for(var i = 0; i < mysqlPool.length; i++){
			return mysqlPool[i];
		}
	}
	return null;
}

module.exports = mysqlapi;