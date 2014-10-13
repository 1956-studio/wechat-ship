var express = require('express');
var router = express.Router();

var userControllers = require("../controllers/user.js");
var logs = require("./logs");
var regex = require("./regex");
var list = require("./list");
var config = require("./config");
var server = require("./server");
var test = require("./test");
var user = require("./user");
var errors = require("./errors");
var auth = require("../auth");

router.get('/', auth.Auth, function(req, res) {
	var m_result = {
		headTitle: "index"
	}
	process.nextTick(function () {	//for more effective
		req.getUser(function (err, result) {
			if(err) {
				res.redirect("login");
			}else {
				m_result.user = {
					id: result.id,
					username: result.username
				}
				res.render("index", m_result);
			}
		});
	});
});

router.get('/login', function(req, res) {
	if(req.isAuth) {
		res.redirect('/');
	}else{
		res.render("login");
	}
});

router.post('/login', function(req, res) {
	req.login(req.body.username, req.body.password, function (err) {
		if (err){
			res.redirect('/login');
		}else {
			res.redirect('/')
		}
	})
});

router.get('/logout', function(req, res) {
	req.logout(function (err) {
		if(err){
			// Impossible
			res.writeHead(404);
			res.end();
		}else {
			res.redirect('/login');
		}
	});
});

router.post("/user/:id", auth.Auth, user.update);

router.get("/logs",  logs.list);
router.get("/logs/:page", auth.Auth, logs.list);

router.get("/regex", auth.Auth, regex.list);
router.get("/regex/detail/:id", auth.Auth, regex.detail);
router.all("/regex/add", auth.Auth, regex.add);
router.get("/regex/list", auth.Auth, regex.list);
router.get("/regex/list/:page", auth.Auth, regex.list);
router.post("/regex/update/", auth.Auth, regex.update);
router.delete("/regex/:id/", auth.Auth, regex.delete);

router.get("/list", auth.Auth, list.list);
router.get("/list/list", auth.Auth, list.list);
router.get("/list/list/:page", auth.Auth, list.list);
router.get("/list/detail/:id", auth.Auth, list.detail);
router.post("/list/addlist", auth.Auth, list.addList);
router.get("/list/:listid/view/", auth.Auth, list.viewsDetail);
router.get("/list/:listid/view/:viewid", auth.Auth, list.viewsDetail);
router.post("/list/:listid/view/save", auth.Auth, list.viewSave);
router.post("/list/:listid/view/save/:viewid", auth.Auth, list.viewSave);
router.delete("/list/:id", auth.Auth, list.delete);
router.delete("/list/:listid/view/:viewid", auth.Auth, list.deleteView);

router.get("/config", auth.Auth, config.getApp);
router.get("/config/app", auth.Auth, config.getApp);
router.get("/config/db", auth.Auth, config.getDb);
router.get("/config/log", auth.Auth, config.getLog);

router.get("/server", auth.Auth, server.listStatus);
router.all("/server/startup", auth.Auth, server.startup);
router.get("/server/liststatus", auth.Auth, server.listStatus);
router.get("/server/stop", auth.Auth, server.stop);
router.get("/server/restart", auth.Auth, server.restart);

router.get("/test", auth.Auth, test.index);
router.post("/test", auth.Auth, test.exec);

router.get("/errors", auth.Auth, errors.index);
router.post("/errors/:id", auth.Auth, errors.update);
router.put("/errors", auth.Auth, errors.create);
router.delete("/errors/:id", auth.Auth, errors.delete);


module.exports = router;