var errorsControllers = require("../controllers/errors.js");
var log = require('../log');

var errors = {};

// GET: /errors
errors.index = function (req, res) {
	errorsControllers.list(function (err, doc) {
		if(!err) {
			var m_result = {
				headTitle: 'Error',
				errors: doc
			}
			res.render('errors/index', m_result);
		}else {
			res.end('errors');
		}
	});
}

// POST: /errors/:id
errors.update = function (req, res) {
	var id = req.params.id;
	var error = req.body;
	error.id = id;
	errorsControllers.update(error, function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err);
		}else {
			req.method = 'GET';
			errors.index(req, res);
		}
	});
}

// PUT: /errors
errors.create = function (req, res) {
	errorsControllers.create(req.body, function () {
		errorsControllers.list(function (err, doc) {
			if(!err) {
				var m_result = {
					headTitle: 'Error',
					errors: err
				}
				res.render('errors/index', m_result);
			}else {
				res.end('errors');
			}
		});
	});
}

// DELETE: /errors/:id
errors.delete = function (req, res) {
	errorsControllers.delete(req.params.id, function (err) {
		if(err) {
			res.writeHead(400);
			res.end(err);
		}else {
			req.method = 'GET';
			errors.index(req, res);
		}
	});
}

module.exports = errors;