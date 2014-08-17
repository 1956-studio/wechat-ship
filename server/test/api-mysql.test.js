require("should");

var mysqlapi = require("../core/mysqlapi");

describe('mysqlapi', function() {
	it('getpool', function(done) {
		mysqlapi.getPool(0).query("SELECT test from test", function(err, res){
			res[0].test.should.eql("ok");
			done();
		});
	});
});