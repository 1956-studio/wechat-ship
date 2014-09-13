require("should");

var request = require("request");

describe("module test", function(){
	it("post a request", function(done){
		request.post({
			url: "http://127.0.0.1/test",
			form: {code: "res.send('a')"}
		}, 
		function (err, r, body) {
			body.should.eql('a');
			done();
		});
		
	});
});