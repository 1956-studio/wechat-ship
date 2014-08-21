
regexControllers = {};

regexControllers.getList = function (page, cb) {
	//TODO: with db
	cb(null, {regex:[{
			id: 123,
			title: "匹配1啊匹配1",
			regex: "我是正则表达式..."
		},
		{
			id: 321,
			title: "匹配2啊匹配2",
			regex: "我是正则表达式222..."
		}],
		page:{
				current: 1,	/*当前页数：第current页*/
				size: 10,	/*每页条数*/
				count: 1000,	/*总条数： 共count条*/
				total: 100	/*总页数: 共total页*/
		}});
}

regexControllers.getObject = function (id, cb) {
	//TODO: with db
	cb(null, {
		id: 123,
		title: "匹配1啊匹配1",
		regex: "我是正则表达式...",
		code: "console.log('hello');"
	});
}
module.exports = regexControllers;