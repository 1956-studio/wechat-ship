require("should");
var http = require("http");

var buffer = require("../core/buffer");
var api = require("../core/api");
var config = require("../core/config");
var assert = require('assert');

describe('api: post', function() {
	var data = "some string here";

	it("buffer set normal", function(done){
		buffer.set("data", data);
		done();
	});
	it("buffer get normal", function(done){
		buffer.get("data", function(err, res){
			res.should.eql(data);
			done();
		});
	});
	it("buffer del", function (done) {
		buffer.del("data", function (err) {
			assert.equal(err, null, "err should be null");
			buffer.get("data", function(err, res){
				assert.equal(err, null, "err should be null");
				assert.equal(res, null, "res should be null");
				done();
			});
		})
	})
	// create test server
	var occur = 0;
	http.createServer(function(req, res){
		occur++;
		res.end("{key:'value'}");
	}).listen(80, "127.0.0.1");

	it("post request with no buffer", function(done){
		api.post("http://127.0.0.1", "hello", false, function(err, res){
			res.should.eql({key:'value'});
			done();
		});
	});
	it("post request with buffer(not been buffered)", function(done){
		api.post("http://127.0.0.1", "hello", true, function(err, res){
			res.should.eql({key:'value'});
			occur.should.eql(2);
			done();
		});
	});
	it("post request with buffer(been buffered)", function(done){
		api.post("http://127.0.0.1/path/a", "hello", true, function(err, res){
			res.should.eql({key:'value'});
			occur.should.eql(2);	//should not view server
			done();
		});
	});
	it("post request with buffer(been buffered) and arrive expire time", function(done){
		setTimeout(function () {
			api.post("http://127.0.0.1/a", "hello", true, function(err, res){
				res.should.eql({key:'value'});
				occur.should.eql(3);
				done();
			});
		}, config.redis.expireTime * 1000 + 2000);	// do not forget used: mocha api-post.test.js -t 35s
		
	});

});