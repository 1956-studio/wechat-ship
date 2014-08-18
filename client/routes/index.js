var express = require('express');
var router = express.Router();

var userControllers = require("../controllers/user.js")

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
})

module.exports = router;