var should = require('should');
var dbLog = require('../db/logs.js');
var assert = require('assert');
require("../db");

describe('dbLog', function() {
	it('getResult', function(done) {
		dbLog.getResult(1, '', [new Date("2014-01-01"), new Date("2014-10-10")], 
			function (err, result) {
				assert.equal(err, null, 'err is not null');
				done();
				console.log(result);
		});
	});
});