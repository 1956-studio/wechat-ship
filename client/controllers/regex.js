
var db = require('../db/regex');

regexControllers = {};

// cb(err, res)
regexControllers.getList = function (page, cb) {
	//TODO: with db
	cb(null, {regex:[{
			id: 123,
			title: "匹配1啊匹配1",
			regex: "我是正则表达式...",
			code: "console.log('hello')"
		},
		{
			id: 321,
			title: "匹配2啊匹配2",
			regex: "我是正则表达式222...",
			code: ""
		}],
		page:{
				current: 1,	/*当前页数：第current页*/
				size: 10,	/*每页条数*/
				count: 1000,	/*总条数： 共count条*/
				total: 100	/*总页数: 共total页*/
		}});
}

// cb(err, res)
regexControllers.getObject = function (id, cb) {
	//TODO: with db
	// cb(null, {
	// 	id: 123,
	// 	title: "匹配1啊匹配1",
	// 	regex: "我是正则表达式...",
	// 	code: "console.log('hello');"
	// });

	var condition = {"id": id};

	db.read(condition, cb);
	
}

// cb(err, id)
// WARNING: this cb need callback an id
regexControllers.addObject = function (regex, cb) {
	/*
	regex: title, regex, code
	*/
	// cb(null, 11);

	db.save(regex, cb);
}

// cb(err)
regexControllers.updateObject = function (regex, cb) {
	/*
	regex:id title, regex, code
	*/
	// cb(null);

	db.modify(regex, cb);
}

module.exports = regexControllers;