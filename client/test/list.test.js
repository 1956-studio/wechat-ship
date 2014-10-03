require('../db/index');
var ListSchema = require('../db/list.js');
var mongoose = require('mongoose');
var assert = require('assert');
var should = require('should');

var listController = require('../controllers/list');

var ListModel = mongoose.model('list');

var listid;
var viewid;

var nid;
var nlist;

describe('#List Db', function() {
	
	it('New list', function(done) {
		var list = new ListModel({name: '111', view: null});
		nid = list.id;
		nlist = list;
		list.Save(function () {
			done();
		});
	});
	it('Push view', function(done) {
		nlist.pushView({
			title: 'aaa',
			code: 'bbb'
		}, function () {
			listid = nlist.id;
			viewid = nlist.views[0].id;
			listid.should.be.a.String;
			viewid.should.be.a.String;
			done();
		});
	});
});

describe('#list controllers', function() {
	before(function (done) {
		listController.LoadLists(done);
	});
	it('GetListViewObject', function(done) {
		listController.getListViewObject(listid, viewid, function (err, doc) {
			doc.title.should.be.eql('aaa');
			doc.code.should.be.eql('bbb');
			done();
		});
	});
	it('Add list view', function(done) {
		listController.addListViews(listid, {title: 'ccc', code: 'ggg'}
		, function (err, list) {
			done();
		});
	});
	it.skip('Save view(Add)', function(done) {
		var list = {
			id: listid,
			view: {title: "reply{1}show name", code: "res.reply('ltc')"}
		}
		listController.saveView(list, done);
	});
	it('Save view(Update)', function(done) {
		var list = {
			id: listid,
			view: {id: viewid, title: "change", code: "res.reply('ltc')"}
		}
		listController.saveView(list, done);
	});
});