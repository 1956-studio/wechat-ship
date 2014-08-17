require("should");
require("mocha");

var tools = require("../core/tools");

describe("tools", function(){
	it("json to string", function(done){
		var data = {
			data1: "1111",
			data2: "2222",
		}
		tools.objToString(data).should.eql('{"data1":"1111","data2":"2222"}');
		done();
	});
	it("string to json", function(done){
		var str = '{"data1":"1111","data2":"2222"}';
		var data = {
			data1: "1111",
			data2: "2222",
		}
		tools.stringToObj(str).should.eql(data);
		done();
	});
});