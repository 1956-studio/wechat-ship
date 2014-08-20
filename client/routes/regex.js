var express = require('express');
var router = express.Router();

var regexControllers = require("../controllers/regex.js");

var regex = {};

regex.list = function (req, res) {
	var page = parseInt(req.params.page);
	console.log(page);

	regexControllers.getList(page, function (err, results) {
		if(err){
			res.render("regex", {});
		}else{
			res.render("regex", {regex: results});
		}
	});
}

module.exports = regex;