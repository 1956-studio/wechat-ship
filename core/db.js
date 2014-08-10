
var db = {};

db.findCommands = function(cb) {
	results = new Array();
	results.push({keys:"aaa", cmd: "res.wait('view')"});
	results.push({keys:"bbb", cmd: "res.reply('miao le ge mi')"});
	//TODO: mongoose db here
	cb(null, results)
};

db.findList = function(cb) {
	var results = new Array();
	result1 = {
		key: "view",
		list: [
			["回复{a}查看我的性别", function(info, req, res){res.nowait('male')}],
			["回复{b}查看我的年龄", function(info, req, res){res.nowait('18')}],
		],
	}
	results.push(result1);
	cb(null, results);
};

module.exports = db;