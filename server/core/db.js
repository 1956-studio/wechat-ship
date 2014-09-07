
var db = {};

db.findCommands = function(cb) {
	results = new Array();
	results.push({keys:"aaa", cmd: "res.wait('view')"});
	results.push({keys:"ccc", cmd: "res.wait('view2')"});
	results.push({keys:"bbb", cmd: "res.reply('miao le ge mi')"});
	//TODO: mongoose db here
	cb(null, results)
};

db.findList = function(cb) {
	var results = new Array();
	result1 = {
		key: "view",
		list: [
			{key: "reply {a} look my name", val: "res.nowait('ltc')"},
			{key: "reply {b} look my age", val: "res.reply('22')"}
		],
	}
	result2 = {
		key: "view2",
		list: [
			{key: "reply {a} look my name222", val: "res.nowait('ltc222')"},
			{key: "reply {b} look my age222", val: "res.reply('22222')"}
		],
	}
	results.push(result1);
	results.push(result2)
	cb(null, results);
};

module.exports = db;