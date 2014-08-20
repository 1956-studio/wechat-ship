
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

module.exports = regexControllers;