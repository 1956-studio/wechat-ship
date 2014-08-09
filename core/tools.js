
var tools = {};

tools.matchKeyWords = function(keys, strings, splitChar){
	var regx_strs = keys.split(splitChar);
	for(var i = 0; i < regx_strs.length; i++){
		if(!regx_strs[i])	//防止多输入了一个分隔符
			continue;
		var regx = new RegExp(regx_strs[i], "i");
		if(regx.test(strings)){
			return regx.exec(strings);
		}
	}
	return false;
}

module.exports = tools;