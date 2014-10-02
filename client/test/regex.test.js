require('../db/index');
var RegexSchema = require('../db/regex.js');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');

var regexControllers = require('../controllers/regex')

describe('#Regex db: ', function() {
	it('Save should be success', function(done) {
		var m = {
			title: "default_regex",
			regex: "/^\d+$/",
			code: "console.log('default regex has been save')"
		}
		
		regex = mongoose.model('regex');
		entity = new regex(m);
		entity.Save(done);
		entity.id.should.be.a.String;
	});
});


describe.only('#Regex controller', function() {
	before(function(done){
		regexControllers.LoadRegexs(done);
	})
	var addid;
	it('Add Regex should be success', function(done) {
		regexControllers.addObject({
			title: 'regex',
			regex: "/^\d+$/",
			code: "console.log('default regex has been save')"
		}, function(err, id){
			id.should.be.a.String;
			addid = id;
			done();
		});
	});
	var obj;
	it('getObject should be success', function(done) {
		regexControllers.getObject(addid, function(err, doc) {
			doc.should.be.an.Object;
			obj = doc;
			done();
		})
	});
	it('Update Regex should be success', function(done) {
		obj.title = 'new regex';
		regexControllers.updateObject(obj, done);
		regexControllers.getObject(addid, function(err, doc) {
			doc.title.should.be.eql('new regex')
			done();
		})
	});
});