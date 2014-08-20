
regexControllers = {};

regexControllers.getList = function (page, cb) {
	//TODO: with db
	cb(null, [{
		title: "匹配1啊匹配1",
		regex: "我是正则表达式..."
	},
	{
		title: "匹配2啊匹配2",
		regex: "我是正则表达式222..."
	}]);
}

regexControllers.getObject = function (id, cb) {
	//TODO: with db
	cb(null, {
		title: "匹配1啊匹配1",
		regex: "我是正则表达式...",
		code: "console.log('hello');"
	});
}
module.exports = regexControllers;