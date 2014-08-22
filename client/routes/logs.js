var express = require('express');
var logs = {};

var logsControllers = require("../controllers/logs.js");

logs.list = function(req, res) {
	var page = parseInt(req.params.page);
	console.log(page, req.query.message, req.query.begtime, req.query.endtime);
	logsControllers.getList(page, req.query.message, [req.query.begtime, req.query.endtime],
		function(err, results) {
			if(err){
				res.render("logs/index", {});
			}else{
				results.title = "logs"
				res.render("logs/index", results);
			}
		}
	);
}


module.exports = logs;