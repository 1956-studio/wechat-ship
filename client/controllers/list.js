var log = require('../log');
var mongoose = require('mongoose');
var ListSchema = require('../db/list');

var ListModel = mongoose.model('list');

listControllers = {};

var lists;

function getList(id) {
	for(var i = 0; i < lists.length; i++) {
		if(lists[i].id === id) {
			return i;
		}
	}
	return null;
}

listControllers.LoadLists = function (done) {
	ListModel.find({}, function (err, doc) {
		if(err) {
			console.log("Load Lists Error: " + err);
		}else {
			console.log("Load Lists Finish!");
			lists = doc || [];
			if(typeof done === 'function') {
				done();
			}
		}
	})
}

listControllers.list = function (pager, cb) {
	// cb(null, {
	// 	list: [
	// 		{
	// 			id: 123,
	// 			name: "hello",
	// 			views: [
	// 				{id: "111", title: "reply{1}show name", code: "res.reply('ltc')"}, 
	// 				{id: "222", title: "reply{2}show age", code: "res.reply('22')"}
	// 			]
	// 		},
	// 		{
	// 			id: 321,
	// 			name: "hello2",
	// 			views: [
	// 				{id: "111", title: "reply{1}show name2", code: "res.reply('ltc2')"}, 
	// 				{id: "222", title: "reply{2}show age2", code: "res.reply('222')"}
	// 			]
	// 		}
	// 	],
	// 	page:{
	// 		current: 1,	/*当前页数：第current页*/
	// 		size: 10,	/*每页条数*/
	// 		count: 1000,	/*总条数： 共count条*/
	// 		total: 100	/*总页数: 共total页*/
	// 	}
	// });
	// TODO: page...
	cb(null, lists);
}

listControllers.getObject = function(id, cb) {
	// cb(null, {
	// 		id: 123,
	// 		name: "hello",
	// 		views: [{id:"111", title: "reply{1}show name", code: "res.reply('ltc')"}, {id:"111", title: "reply{2}show age", code: "res.reply('22')"}]
	// });
	cb(null, lists[getList(id)]);
}


listControllers.addList = function (list, cb) {
	/*
	list:{
		name: "hello",
		views: null
	}
	*/
	//db have to return list for control
	// var result_list = {
	// 	id: "111",
	// 	name: "hello",
	// 	views: null
	// }; 

	var m = new ListModel(list);
	m.Save(function () {
		cb(null, m);
		lists.push(m);
	});
}

listControllers.addListViews = function (listId, view, cb) {
	
	//db have to return list for control
	/*
	views: 
	{id:"111", title: "reply{1}show name", code: "res.reply('ltc')"}
	*/
	var list = lists[getList(listId)];
	list.pushView(view);
	cb(null, list);
}

listControllers.getListViewObject = function (listid, viewid, cb) {
	if(listid == null || viewid == null){
		cb(null, null);
		return;
	}

	var list = lists[getList(listid)];
	var views = list.views;
	if(views == null) {
		cb(null, null);
		return;
	}
	// find the view
	for(var i = 0; i < views.length; i++) {
		if(views[i].id === viewid) {
			cb(null, views[i]);
			return;
		}
	}
	cb(null, null);
}

listControllers.saveView = function (alist, cb) {
	// ATTENTION: list.view.id could be null
	// if then exec add operation, otherwise exec update 
	/*
	list: {
		id: "111",
		view: {id:"222", title: "reply{1}show name", code: "res.reply('ltc')"}
	}
	*/
	var view = alist.view;	//return the view that was add/update
	var list = lists[getList(alist.id)];
	if(!list) {
		cb('list is null', null);
		return;
	}
	if(view.id == undefined || view.id == null || view.id == '') {
		// new view
		list.pushView(view, cb);
	
	}else {
		// update the view
		// find the view
		for(var i = 0; i < list.views.length; i++) {
			if(list.views[i].id === view.id) {
				// update view
				list.views[i] = alist.view;
				ListModel.updateView(alist.id, view);
				cb(null, list.views[i]);
				return;
			}
		}
		cb(null, null);
	}
}
module.exports = listControllers;