var express = require('express');

var configControllers = require("../controllers/config.js");

/*
This is server's config.
*/
config = {};

config.getApp = function (req, res) {
	configControllers.get(function (err, result) {
		res.render("config/get", result);
	});
}

config.getDb = function (req, res) {
}

config.getLog = function (req, res) {
	
}
module.exports = config;