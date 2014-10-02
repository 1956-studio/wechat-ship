var express = require('express');
var router = express.Router();

var regexControllers = require("../controllers/regex.js");

var regex = {};

regexControllers.LoadRegexs();

// GET /regex
// GET /regex/:page
regex.list = function (req, res) {
	var page = parseInt(req.params.page);	//mayby NaN

	regexControllers.getList(page, function (err, results) {
		if(err){
			res.writeHead(404);
			res.end();
		}else{
			var ret_results = {}
			ret_results.headTitle = "regex";
			ret_results.regex = results;
			res.render("regex/index", ret_results);
		}
	});
}

// GET /regex/detail/:id
regex.detail = function(req, res) {
	regexControllers.getObject(req.params.id, function (err, result) {
		if(err || result == null) {
			res.writeHead(404);
			res.end();
		}else {
			result.headTitle = "regex - detail";
			res.render("regex/detail", result);
		}
	});
}

// ALL: /regex/add
regex.add = function(req, res) {
	if(req.method == "GET"){
		res.render("regex/add");
	}else if(req.method == "POST"){
		regexControllers.addObject(req.body, function (err, id) {
			if(err) {
				res.writeHead(404);
				res.end();
				return;
			}
			res.redirect("/regex/detail/" + id);
		});
	}
}

// POST: /regex/update/
regex.update = function (req, res) {
	regexControllers.updateObject(req.body, function (err) {
		if(err) {
			res.writeHead(404);
			res.end();
		}
		res.redirect("/regex/detail/" + req.body.id);
	});
}

module.exports = regex;