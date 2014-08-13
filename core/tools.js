var tools = {};

//keys: regex1|regex2 ...
//strings: string that needed to regex
//return: array of regex. array[0]:regex's string, array[1...]:the result of regexing group 
tools.matchKeyWords = function(keys, strings, splitChar){
	var regx_strs = keys.split(splitChar);
	for(var i = 0; i < regx_strs.length; i++){
		if(!regx_strs[i])	//prevent to input once more splitChar
			continue;
		var regx = new RegExp(regx_strs[i], "i");
		var test = regx.exec(strings);
		if(test){
			return test;
		}
	}
	return null;
}

tools.objToString = function(json) {
	return JSON.stringify(json);
}

tools.stringToObj = function(str) {
	return eval("(" + str + ")");  
}

module.exports = tools;