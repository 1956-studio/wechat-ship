var should = require('should');
var dbconf = require('../db/db.js');
var assert = require('assert');

describe('dbconf', function() {
	it('save', function(done) {
		var default_config = {
			redis: {
				host: "127.0.0.1",
				port: "6380",
				pass: "redis"
			},
			session: {
				secret: "session",
				resave: false,
				saveUninitialized: false
			},
			timeout: 2000
		};

		dbconf.save(default_config, function (err, result) {
			result.should.have.property('timeout', 2000);
			done();
		});
	});
	it('read', function(done) {
		dbconf.read(null, function (err, result) {
			assert.equal(err, null, 'err is not null');
			done();
		});
	});
	it('read', function(done) {
		dbconf.read({"timeout":2000}, function (err, result) {
			result.should.have.property('timeout', 2000);
			done();
		});
	});
	it('readById', function(done) {
		dbconf.readById("53f9efdb9dd7d87d13d1fc12", function (err, result) {
			result.should.have.property('timeout', 2000);
			done();
		});
	});
	it('removeByIdNull', function(done) {
		dbconf.removeById("53f27d311535cebc11847ba7", function (err) {
			assert.equal(err, null, 'err is not null');
			done();
		});
	});
	it('removeByIdNotNull', function(done) {
		dbconf.removeById("53f9eb3cd990556911ee6ed7", function (err) {
			assert.equal(err, null, 'err is not null');
			done();
		});
	});
});