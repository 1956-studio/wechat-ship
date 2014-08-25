
listControllers = {};

listControllers.list = function (pager, cb) {
	cb(null, {
		list: [
			{
				id: 123,
				name: "hello",
				views: [
					{id: "111", title: "reply{1}show name", code: "res.reply('ltc')"}, 
					{id: "222", title: "reply{2}show age", code: "res.reply('22')"}
				]
			},
			{
				id: 321,
				name: "hello2",
				views: [
					{id: "111", title: "reply{1}show name2", code: "res.reply('ltc2')"}, 
					{id: "222", title: "reply{2}show age2", code: "res.reply('222')"}
				]
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
			views: [{id:"111", title: "reply{1}show name", code: "res.reply('ltc')"}, {id:"111", title: "reply{2}show age", code: "res.reply('22')"}]
	});
}


listControllers.addList = function (list, cb) {
	/*
	list:{
		name: "hello",
		views: null
	}
	*/
	//db have to return list for control
	var result_list = {
		id: "111",
		name: "hello",
		views: null
	}; 
	cb(null, result_list);
}

listControllers.addListViews = function (listId, views, cb) {
	
	//db have to return list for control
	/*
	views: 
	{id:"111", title: "reply{1}show name", code: "res.reply('ltc')"}
	*/
	var list = {
		id: "111",
		name: "hello",
		views: [] //a view array
	}; 

	cb(null, list);
}

listControllers.getListViewObject = function (listid, viewid, cb) {
	if(viewid == null){
		cb(null, null);
		return;
	}

	var view = {id:"111", title: "reply{1}show name", code: "res.reply('ltc')"};
	cb(null, view);
}

listControllers.saveView = function (list, cb) {
	// ATTENTION: list.view.id could be null
	// if then exec add operation, otherwise exec update 
	/*
	list: {
		id: "111",
		view: {id:"222", title: "reply{1}show name", code: "res.reply('ltc')"}
	}
	*/
	var view = list.view;	//return the view that was add/update
	cb(null, view);
}
module.exports = listControllers;