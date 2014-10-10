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
	it('test createUser', function(done) {
		db.addUser({
			openid: '1111',
			nickname: 'lisheep',
			info: {
				spell: 'mie~'
			}
		}, function (err) {
			(err == undefined).should.be.true;
			done();
		});
	});
	it('test createUser should be error', function(done) {
		db.addUser({
			openid: '1111',
			nickname: 'lisheep',
			info: {
				spell: 'mie~'
			}
		}, function (err) {
			err.should.be.eql(1);
			done();
		});
	});
	it('test update user should be success', function(done) {
		db.findUser('1111', function (err, doc) {
			var obj = {
				openid: doc.openid,
				info: {
					spell: 'hello'
				}
			}
			db.updateUser(obj, function (err) {
				console.log(err);
				(err == undefined).should.be.true;
				done();
			});
		});
	});
	it('test del user should be success', function(done) {
		db.delUser('1111', function (err) {
			(err == undefined).should.be.true;
			done();
		});
	});
});