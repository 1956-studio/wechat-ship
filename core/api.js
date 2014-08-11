var request = require("request");
var util = require("util");

var config = require("./config");
var log = require("./log");
var error = require("./error");
var tools = require("./tools");

var api = {};

//url:http://127.0.0.1/path
//data: an object
//cb(err, result)
api.post = function(url, data, cb) {
	options = {
		method: "POST",
		url: url,
		timeout: config.request.timeout,
		json: data,
	};
	request(options, function(err, req, res){
		if(err) {
			log.toolslog("error", util.format("at api.post: request url:%s, data: %j, error:%s", 
				url, data, err));
			cb(error.get("syserr", null));
		}else{
			cb(null, res.body);
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



module.exports = api;