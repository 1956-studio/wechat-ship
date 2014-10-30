var logsControllers = require("../controllers/logs.js");

var logs = {};

// GET: /logs/
// GET: /logs/:page
logs.list = function(req, res) {
	var page = parseInt(req.params.page);
	logsControllers.getList(page, req.query.message, [req.query.begtime, req.query.endtime],
		function(err, results) {
			if(err){
				res.writeHead(404);
				res.end();
			}else{
				var m_results = {
					headTitle: "logs",
					logs: results
				}
				res.render("logs/index", m_results);
			}
		}
	);
}


module.exports = logs;