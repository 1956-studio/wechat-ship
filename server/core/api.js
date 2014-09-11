var request = require("request");
var util = require("util");
var async = require("async");
var md5 = require("md5");

var config = require("./config");
var log = require("./log");
var error = require("./error");
var tools = require("./tools");
var buffer = require("./buffer");
var user = require("./user")

var api = {};


// url: http://222.26.224.56/path
// return path/md5(datastr)
function hashData (url, datastr) {
	url = url.toLowerCase().substr(7);
	var indexS = url.indexOf("/");
	if(indexS == -1 || url.substr(indexS + 1) == "" ) {	// url is like http://127.0.0.1 or http://127.0.0.1/
		url = "host";
	}else {
		url = url.substr(indexS + 1);
	}
	console.log(url);	
	return url+ "/" + md5.digest_s(datastr);
}

//url:http://127.0.0.1/path
//data: an object
//ifbuff: whether buffer the post
//cb(err, result)
api.post = function(url, data, ifbuff, cb) {
	var datastr = tools.objToString(data);
	var hashstr;
	if(ifbuff) {
		hashstr = hashData(url, datastr);
	}
	async.series([
		function(callback) {
			if(ifbuff){
				buffer.get(hashstr, function(err, res_get){
					if(err){
						callback(err, null);
						return;
					}
					if(!res_get){	//buffer not hit
						callback(null, null);
					}else{	//buffer hit
						callback(1, tools.stringToObj(res_get));
					}
				});
			}else{	//not a buff request
				callback(null, null);
			}
		},
		function(callback) {	//buffer not hit
			//request for data
			options = {
				method: "POST",
				url: url,
				timeout: config.request.timeout,
				// body:datastr,
				json:data
			};
			request(options, function(err, res, body){
				if(err) {
					log.apilog("error", util.format("at api.post: request url:%s, data: %j, error:%s", 
						url, data, err));
					callback(error.get("syserr", null));
				}else{
					//set buffer
					if(ifbuff){
						buffer.set(hashstr, body);
					}
					callback(null, tools.stringToObj(body));
				}
			});
		}
		], function(err, result){
			if(err == 1) {	//buffer hit, get from first callback
				cb(null, result[0]);
			}else{	//buffer not hit, get from second callback; or some err occur
				cb(err, result[1]);
			}
	});
}

api.wait = function(res, listName) {
	res.wait(listName);
}

api.nowait = function(res, listName) {
	res.nowait(listName);
}

api.sendText = function(res, text) {
	res.reply(text);
}

api.sendImage = function(res, mediaId) {
	res.reply({
	  type: "image",
	  content: {
	    mediaId: mediaId
	  }
	});
}

api.sendVoice = function(res, mediaId) {
	res.reply({
	  type: "voice",
	  content: {
	    mediaId: mediaId
	  }
	});
}

api.sendVideo = function(res, mediaId, thumbMediaId) {
	res.reply({
	  type: "video",
	  content: {
	    mediaId: mediaId,
	    thumbMediaId: thumbMediaId
	  }
	});
}

api.sendMusic = function(res, title, description, musicUrl, hqMusicUrl) {
	res.reply({
	  title: title,
	  description: description,
	  musicUrl: musicUrl,
	  hqMusicUrl: hqMusicUrl
	});
}

//articls is an array of object of {title, description, picurl, url}
/*
just like below:
articls = [{
	title: title,
	description: description,
	picurl: picurl,
	url: url
},{
	title: title2,
	description: description2,
	picurl: picurl2,
	url: url2
}]
*/
api.sendTextImage = function(res, articls) {
	res.reply(articls);
}

api.writelog = function(level, str) {
	log.userlog(level, str);
}

// wechat user
api.addUser = function (info, userid, cb) {
	// body...
	var user = {
		openid: info.FromUserName,
		userid: userid
	}
	user.addUser(user, cb);
}

api.delUser = function (info, cb) {
	user.delUser(info.FromUserName, cb);
}

api.updateUser = function (info, userid, cb) {
	user.updateUser(info.FromUserName, {userid: userid}, cb);
}

api.findUser = function (info, cb) {
	user.findUser(info.FromUserName, cb);
}

module.exports = api;