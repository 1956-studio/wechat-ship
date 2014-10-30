var mongoose = require('mongoose');
var _ = require('underscore');

var RegexModel = mongoose.model('regex');

regexControllers = {};

var regexs;

function getRegex(id) {
	for(var i = 0; i < regexs.length; i++) {
		if(regexs[i].id === id) {
			return i;
		}
	}
	return null;
}

regexControllers.LoadRegexs = function(done) {
	RegexModel.find({}, function (err, doc) {
		if(err) {
			console.log("Load Regexs Error: " + err);
		}else {
			console.log("Load Regexs Finish!");
			regexs = doc || {};
			if(typeof done === 'function') {
				done();
			}
		}
	});
}

// cb(err, res)
regexControllers.getList = function (page, cb) {

	// cb(null, {regex:[{
	// 		id: 123,
	// 		title: "匹配1啊匹配1",
	// 		regex: "我是正则表达式...",
	// 		code: "console.log('hello')"
	// 	},
	// 	{
	// 		id: 321,
	// 		title: "匹配2啊匹配2",
	// 		regex: "我是正则表达式222...",
	// 		code: ""
	// 	}],
	// 	page:{
	// 			current: 1,	/*当前页数：第current页*/
	// 			size: 10,	/*每页条数*/
	// 			count: 1000,	/*总条数： 共count条*/
	// 			total: 100	/*总页数: 共total页*/
	// 	}});

	// TODO: page...
	cb(null, regexs);

}

// cb(err, res)
regexControllers.getObject = function (id, cb) {

	// cb(null, {
	// 	id: 123,
	// 	title: "匹配1啊匹配1",
	// 	regex: "我是正则表达式...",
	// 	code: "console.log('hello');"
	// });
	var index = getRegex(id)
	cb(null, regexs[index]);
}

// cb(err, id)
// WARNING: this cb need callback an id
regexControllers.addObject = function (regex, cb) {
	/*
	regex: title, regex, code
	*/
	// cb(null, id);

	var model = new RegexModel(regex);
	model.Save(function (err) {
		if(!err) {
			cb(null, model.id);
			regexs.push(model);
		}
	});
}

// cb(err)
regexControllers.updateObject = function (regex, cb) {
	/*
	regex:id title, regex, code
	*/
	var oldRegex = regexs[getRegex(regex.id)];
	oldRegex.title = regex.title;
	oldRegex.regex = regex.regex;
	oldRegex.code = regex.code;

	oldRegex.Save(cb);	
}

regexControllers.deleteObject = function (id, cb) {
	var index = getRegex(id);
	var delRegex = regexs[index];
	if(delRegex) {
		delRegex.remove(function (err) {
			[].splice.call(regexs, index, 1);
			cb(err);
		});
	}
}

module.exports = regexControllers;