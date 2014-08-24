var express = require('express');
var router = express.Router();

var regexControllers = require("../controllers/regex.js");

var regex = {};

// GET /regex
// GET /regex/:page
regex.list = function (req, res) {
	var page = parseInt(req.params.page);	//mayby NaN

	regexControllers.getList(page, function (err, results) {
		if(err){
			res.render("regex/index", {});
		}else{
			results.title = "regex"
			res.render("regex/index", results);
		}
	});
}

// GET /regex/detail/:id
regex.detail = function(req, res) {
	regexControllers.getObject(req.params.id, function (err, result) {
		if(err) {
			res.redirect("/regex/list");
		}else {
			result.title = "regex - detail";
			res.render("regex/detail", result);
		}
	});
}

// ALL: /regex/add
regex.add = function(req, res) {
	if(req.method == "GET"){
		res.render("regex/add");
	}else if(req.method == "POST"){
		regexControllers.addObject(req.body, function (err) {
			res.redirect("/regex/list");
		});
	}
}

// POST: /regex/update/
regex.update = function (req, res) {
	regexControllers.updateObject(req.body, function (err) {
		res.redirect("/regex/detail/" + req.body.id);
	});
}

module.exports = regex;