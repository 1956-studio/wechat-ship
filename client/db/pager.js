var config = require('../config');

var pager = function (num) {
	this.total = 0;
	this.pageSize = config.page.size;
	this.totalCount = 0;
	this.num = num;
}

module.exports = pager;
