var should = require('should');

var serverController =  require("../controllers/server");


describe("Server", function(){
	it('start one server', function(done) {
		serverController.startup(8000, 1, done);
	});
	it('start two server', function(done) {
		serverController.startup(8000, 2, done);
	});
	it("list", function(done){
		serverController.list(function(err, res){
			res.length.should.eql(3);
			done();
		});
	});
	it.skip("stop by file", function(done){
		serverController.list(function(err, res){
			serverController.stop(res[0].file, function(err, res){
				res.should.be.an.Object;
				done();
			});
		});
	});
	it("stopAll", function(done){
		serverController.stopAll(function(err, res){
			res.should.be.an.Object;
			done();
		});
	});
});
