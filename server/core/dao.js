
var _ = require("underscore");

var db = require('./db');
var error = require('./error');
var log = require('./log');
var tools = require('./tools');


var dao = {};

//In dao's error->cb(err, ...), we have to use error.get("error_keyworkd") 
//So index can reply error info directly 

//cb(err, result)
dao.matchContent = function(content, cb) {
	if(!content) {
		cb(error.get("msgnull"), null);
		return;
	}
	//find all commands
	db.findRegex(function(err, results) {
		if(err) {
			return cb(error.get("syserr"), null);
		}
		if(results == null) {
			log.dblog("error", "findCommands find nothing");
			return cb(error.get("syserr"), null);
		}
		for(var i =0; i < results.length; i++) {
			var test = tools.matchKeyWords(results[i].regex, content, "|")
			if(test){
				var ret_result = results[i];
				ret_result.group = test;
				return cb(null, ret_result);
			}
		}
		log.daolog("info", "msg:[" + content + "] match nothing");
		return cb(null, null);		//if match nothing
	});
}


dao.getList = function(cb) {
	db.findList(function(err, results) {
		if(err) {
			return cb(error.get("syserr"), null);
		}
		for(var i in results){
			var items = new Array();
			results[i].items = items;
			for(var j = 0; j < results[i].views.length; j++) {
				items.push(getItems(results[i].views[j]));
			}
		}
		return cb(null, results);
	});
}


/*
what a fuck function, if not used it, item["val"] would be undefined!
*/
function getItems (item) {
	var result = new Array(2);
	result[0] = item["title"];
	result[1] = function (info, req, res) {
		eval(item["code"]);
	};
	return result;
}

module.exports = dao;