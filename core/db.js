
var db = {};

db.findCommands = function(cb) {
	results = new Array();
	results.push({keys:"aaa", cmd: "res.reply('hello world')"});
	results.push({keys:"bbb", cmd: "res.reply('miao le ge mi')"});
	//TODO: mongoose db here
	cb(null, results)
};

module.exports = db;