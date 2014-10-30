var serverController = require("../controllers/server");

var server = {};

// ALL: /server/startup
server.startup = function (req, res) {
	if(req.method == "POST") {
		var port = Number(req.body.port);
		var num = Number(req.body.num);
		if(isNaN(num)) {
			num = undefined;
		}
		if(isNaN(port)) {
			res.writeHead(400);
			res.end("port is not number");
		}else {
			serverController.startup(port, num);
			res.redirect("/server");
		}
	}else {
		res.redirect("/server");
	}
}

// GET: /server
// GET: /server/liststatus
server.listStatus = function (req, res) {
	serverController.list(function(err, result){
		if(err) {
			res.writeHead(404);
			res.end();
			return;
		}
		var m_result = {
			headTitle: "server list",
			result:result
		}
		res.render("server/listStatus", m_result);
	});
	
}

// GET: /server/stop
server.stop = function (req, res) {
	if(!isNaN(Number(req.body.no))) {
		serverController.stop(req.body.no, function (err) {
			if(err) {
				res.writeHead(400);
				res.end(err.toString());
			}else {
				res.redirect("/server");
			}
		});
	}
	serverController.stopAll(function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err.toString());
		}else {
			res.redirect("/server");
		}
	});
}

// GET: /server/restart
server.restart = function (req, res) {
	serverController.restartAll(function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err.toString());
		}else {
			res.redirect("/server");
		}
	});
}

module.exports = server;