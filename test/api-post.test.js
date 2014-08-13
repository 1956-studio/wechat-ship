require("should");
var http = require("http");

var buffer = require("../core/buffer");
var api = require("../core/api");

describe('api: post', function() {
	it.skip("buffer set normal", function(done){
		buffer.set("data", "some string here");
		done();
	});
	it.skip("buffer get normal", function(done){
		var data = "some string here";
		buffer.get("data", function(err, res){
			res.should.eql(data);
			done();
		});
	});
	create test server
	http.createServer(function(req, res){
		res.end("{key:'value'}");
	}).listen(80, "127.0.0.1");

	it("post request with no buffer", function(done){
		api.post("http://127.0.0.1", {hello:"yes"}, false, function(err, res){
			res.should.eql({key:'value'});
			done();
		});
	});
	it("post request with buffer", function(done){
		api.post("http://127.0.0.1", {hello:"yes"}, true, function(err, res){
			res.should.eql({key:'value'});
			done();
		});
	});
});