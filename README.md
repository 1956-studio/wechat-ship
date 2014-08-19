wechat-ship
===========

微信平台后台管理,快速搭建微信平台

###api:

常用操作：
```
//发送post请求
api.post(url, post_data, ifbuff/*是否缓存该结果*/, function(err, result){
    //...
});
```
```
//写入日志
api.writelog(level, str);
```

微信操作(原理[请参考wechat](https://github.com/node-webot/wechat))：
即时回复(下面所有回复在一次响应中只能执行其中一个、一次)：
```
//被动发送文本信息
api.sendText(res/*直接写res即可，请勿更改，下同*/, text/*需要发送的文本*/)
```
```
//被动发送图片信息
api.sendImage(res, mediaId);
```
```
//被动发送声音信息
api.sendVoice(res, mediaId);
```
```
//发送音乐
api.sendMusic(res, title, description, musicUrl, hqMusicUrl);
```
```
//发送图文信息
var articls = [{
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
api.sendTextImage = function(res, articls);
```
"打电话"回复([请参考wechat的wxsession](https://github.com/node-webot/wechat#wxsession%E6%94%AF%E6%8C%81]))

"打电话"回复需要在配置页面先填写List配置信息
```
//等待某个List
api.wait(res, listName);
```
```
//取消等待某个List，并回复微信text
api.nowait(res, text)
```

------------

wechat-ship还支持使用mysql数据库存储数据。
###mysqlapi
* 在config页面配置数据源
* 
* 在代码页面写入:

```
//poolno为在config页面配置的数据源，从0开始。
mysqlapi.getPool(poolno).query("SQL query", function(err, result){
    //DO WHAT YOU WANT TO DO
});
```
