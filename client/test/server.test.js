var should = require('should');

var serverControllers =  require("../controllers/server");


describe("Server", function(){
	it("list", function(done){
		serverControllers.startup(8000);
		serverControllers.startup(8001);
		serverControllers.list(function(err, res){
			res.length.should.eql(2);
			done();
		});
	});
	it("restart all", function(done){
		serverControllers.restartAll(function(err, res){
			res.should.be.an.Object;
			done();
		});
	});
	it.skip("stop by file", function(done){
		serverControllers.list(function(err, res){
			serverControllers.stop(res[0].file, function(err, res){
				res.should.be.an.Object;
				done();
			});
		});
	});
	it("stopAll", function(done){
		serverControllers.stopAll(function(err, res){
			res.should.be.an.Object;
			done();
		});
	});
});
