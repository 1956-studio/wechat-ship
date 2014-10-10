var should = require('should');
var db = require('../core/db');

describe('#db test', function() {
	it('test findRegex', function(done) {
		db.findRegex(function (err, res) {
			res.should.be.not.null;
			done();
		});
	});
	it('test findList', function(done) {
		db.findList(function (err, res) {
			res.should.be.not.null;
			done();
		})
	});
});