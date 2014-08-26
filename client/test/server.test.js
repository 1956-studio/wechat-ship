var should = require('should');

var serverController =  require("../controllers/server");


describe("Server", function(){
	it("list", function(done){
		serverController.startup(8000);
		serverController.startup(8001);
		serverController.list(function(err, res){
			res.length.should.eql(2);
			done();
		});
	});
	it("restart all", function(done){
		serverController.restartAll(function(err, res){
			res.should.be.an.Object;
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
