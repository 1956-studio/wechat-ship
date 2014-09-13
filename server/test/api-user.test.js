var api = require("../core/api");

require("should");
var assert = require("assert");

describe('api: user', function() {
	var info = {
			FromUserName: "123"
	}
	it("add user", function (done) {
		api.addUser(info, "1018110223", function (err, result) {
			done();
		});
	});
	it("find user", function (done) {
		api.findUser(info, function (err, user) {
			assert.equal(err, null, "err should be null");
			user.should.not.be.eql(null);
			done();
		});
	});
	it("del user", function (done) {
		api.delUser(info, function (err) {
			assert.equal(err, null, "err should be null");
			api.findUser(info, function (err, user) {
				assert.equal(err, null, "err should be null");
				assert.equal(user, null, "user should be null");
				done();
			});
		});
	});
});