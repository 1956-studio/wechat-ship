var config = require('../config');

var page = {};

page.constract = function (num) {
	this.total = 0;
	this.pageSize = config.page.size;
	this.totalCount = 0;
	this.num = num;
}

module.exports = page;