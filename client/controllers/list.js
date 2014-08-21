
listControllers = {};

listControllers.list = function (pager, cb) {
	cb(null, {
		list: [
			{
				id: 123,
				name: "hello",
				views: [{title: "reply{1}show name", code: "res.reply('ltc')"}, {title: "reply{2}show age", code: "res.reply('22')"}]
			},
			{
				id: 321,
				name: "hello2",
				views: [{title: "reply{1}show name2", code: "res.reply('ltc2')"}, {title: "reply{2}show age2", code: "res.reply('222')"}]
			}
		],
		page:{
			current: 1,	/*当前页数：第current页*/
			size: 10,	/*每页条数*/
			count: 1000,	/*总条数： 共count条*/
			total: 100	/*总页数: 共total页*/
		}
	});
}

listControllers.getObject = function(id, cb) {
	//TODO: with db
	cb(null, {
			id: 123,
			name: "hello",
			views: [{title: "reply{1}show name", code: "res.reply('ltc')"}, {title: "reply{2}show age", code: "res.reply('22')"}]
	});
}

module.exports = listControllers;