var should = require('should');
var dbLog = require('../db/log.js');
var assert = require('assert');

describe('dbLog', function() {
	it('getResult', function(done) {
		dbLog.getResult(1, '', [new Date(2014, 08, 10), new Date(2014, 09, 15)], function (err, result) {
			assert.equal(err, null, 'err is not null');
			done();
		});
	});
});