var express = require('express');
var router = express.Router();

var userControllers = require("../controllers/user.js");
var logs = require("./logs");
var regex = require("./regex");
var list = require("./list");
var config = require("./config");
var server = require("./server");

router.get('/', function(req, res) {
	if(req.session.user){
		res.render("index", {user:req.session.user});
	}else{
		res.redirect("login");
	}
 	// res.render('index', { title: 'Main' });
});

router.get('/login', function(req, res){
	if(req.session.user){
		res.redirect('/');
	}else{
		res.render("login");
	}
});

router.post('/login', function(req, res){
	if(userControllers.login({username:req.body.username, password:req.body.password})){
		req.session.user = {username:req.body.username, password:req.body.password};
		res.redirect('/');
	}else{
		res.render("login", {error:"帐号或密码错误"});
	}
	
});

router.all('/logout', function(req, res){
	req.session.user = null;
	res.redirect('login');
});

router.get("/logs", logs.list);
router.get("/logs/:page", logs.list);

router.get("/regex", regex.list);
router.get("/regex/detail/:id", regex.detail);
router.all("/regex/add", regex.add);
router.get("/regex/list", regex.list);
router.get("/regex/list/:page", regex.list);
router.post("/regex/update/", regex.update);

router.get("/list", list.list);
router.get("/list/list", list.list);
router.get("/list/list/:page", list.list);
router.get("/list/detail/:id", list.detail);
router.post("/list/addlist", list.addList);
router.get("/list/:listid/view/", list.viewsDetail);
router.get("/list/:listid/view/:viewid", list.viewsDetail);
router.post("/list/:listid/view/save", list.viewSave);
router.post("/list/:listid/view/save/:viewid", list.viewSave);

router.get("/config", config.getApp);
router.get("/config/app", config.getApp);
router.get("/config/db", config.getDb);
router.get("/config/log", config.getLog);

router.all("/server/startup", server.startup);
router.get("/server/liststatus", server.listStatus);

module.exports = router;