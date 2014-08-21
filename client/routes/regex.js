var express = require('express');
var router = express.Router();

var regexControllers = require("../controllers/regex.js");

var regex = {};

regex.list = function (req, res) {
	var page = parseInt(req.params.page);

	regexControllers.getList(page, function (err, results) {
		if(err){
			res.render("regex/index", {});
		}else{
			res.render("regex/index", results);
		}
	});
}

regex.detail = function(req, res) {
	regexControllers.getObject(req.params.id, function (err, result) {
		if(err) {
			res.redirect("regex/list");
		}else {
			res.render("regex/detail", result);
		}
	});
}

module.exports = regex;