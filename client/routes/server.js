var serverController = require("../controllers/server");

var server = {};

// ALL: /server/startup
server.startup = function (req, res) {
	if(req.method == "POST") {
		var port = Number(req.body.port);
		if(isNaN(port)) {
			res.writeHead(400);
			res.end("port is not number");
		}else {
			serverController.startup(port);
			res.redirect("/server/liststatus");
		}
	}else if(req.method == "GET") {
		res.render("server/startup");
	}else {
		res.wliststatusriteHead(400);
		res.end();
	}
}

// GET: /server/liststatus
server.listStatus = function (req, res) {
	serverController.list(function(err, result){
		var m_result = {
			result:result
		}
		res.render("server/listStatus", m_result);
	});
	
}

module.exports = server;