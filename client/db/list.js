var mongoose = require('mongoose');
var log = require('../log');

var ListSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	views: [{
			title: String,
			code: String
		}]
});


ListSchema.methods.Save = function(done) {
	this.save(function (err) {
		if(err) {
			db.log('error', 'List save: ' + err);
		}
		if(typeof done === 'function') {
			done(err);
		}
	});
};

ListSchema.methods.pushView = function (view, done) {
	this.views.push(view);
	this.save(function (err) {
		if(err) {
			db.log('error', 'Push view: ' + err);
		}
		if(typeof done === 'function') {
			done(err);
		}
	});
}

ListSchema.statics.updateView = function (listid, view, done) {
	this.update({'_id': listid, 'views._id': view.id}, 
		{$set:{
				'views.$.title': view.title,
				'views.$.code': view.code
			}},
			{},
		function (err) {
			if(err) {
				log.dblog('error', 'List save: ' + err);
			}
			if(typeof done === 'function') {
				done(err);
			}
		});	
}

ListSchema.statics.deleteView = function (listid, viewid, done) {
	this.update({'_id': listid}, 
		{$pull:{
				views: {'_id': viewid}
			}},
			{},
		function (err) {
			if(err) {
				log.dblog('error', 'List save: ' + err);
			}
			if(typeof done === 'function') {
				done(err);
			}
		});	
}

mongoose.model('list', ListSchema);

module.exports = ListSchema;