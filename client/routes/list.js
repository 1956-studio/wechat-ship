var listControllers = require("../controllers/list.js");

var list = {};

listControllers.LoadLists();
// GET: /list
// GET: /list/list
// GETl /list/list/:page
list.list = function (req, res) {
	listControllers.list(req.params.page, function (err, results) {
		if(err){
			res.render("list/index", {});
		}else{
			var m_result = {
				headTitle: 'list',
				list: results
			}
			
			res.render("list/index", m_result);
		}
	});
}

// GET: /list/detail/:id
list.detail = function(req, res) {
	listControllers.getObject(req.params.id, function (err, result) {
		if(err) {
			res.redirect("list/list");
		}else {
			result.headTitle = "list-detail";
			res.render("list/detail", result);
		}
	});
}

// POST: /list/addlist
list.addList = function (req, res) {
	console.log(req.body);
	listControllers.addList(req.body, function (err, result) {
		if(err) {
			res.writeHead(400);
			res.end();
		}else {
			res.redirect("/list/detail/" + result.id);
		}
	})
}

// POST: /list/:listid/view/save		(add)
// POST: /list/:listid/view/save/:viewid		(update)
list.viewSave = function (req, res) {
	var view_result = {
		id: req.params.listid,
		view: req.body
	}
	listControllers.saveView(view_result, function (err, result) {
		if(err) {
			res.writeHead(400);
			res.end();
		}else {
			var m_result = {
				headTitle: 'view detail',
				id: req.params.listid,
				view: result
			}
			res.render("list/viewsDetail", m_result);
		}
	})
}


// GET: /list/:listid/view/:viewid
list.viewsDetail = function (req, res) {
	if(req.params.viewid == undefined){	//this is add view
		var m_result = {};
		m_result.id = req.params.listid;
		m_result.headTitle = "list views detail"
		res.render("list/viewsDetail", m_result);
		return;
	}
	listControllers.getListViewObject(req.params.listid, req.params.viewid, function (err, result) {
		if(err) {
			res.writeHead(400);
			res.end();
		}else {
			var m_result = {};
			m_result.headTitle = "view detail"
			m_result.view = result;
			m_result.id = req.params.listid;
			res.render("list/viewsDetail", m_result);
		}
	});
}

// DELETE: /list/:id
list.delete = function (req, res) {
	listControllers.deleteList(req.params.id, function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err);
		}else {
			req.method = 'GET';
			list.list(req, res);
		}
	});
}

// DELETE: /list/:listid/view/:viewid
list.deleteView = function (req, res) {
	var listid = req.params.listid;
	var viewid = req.params.viewid;

	listControllers.deleteView(listid, viewid, function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err);
		}else {
			req.method = 'GET';
			req.params.id = listid;
			list.detail(req, res);
		}
	});
}

module.exports = list;