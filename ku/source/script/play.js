/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var play=deviceone.sm('do_Audio')
var nf = deviceone.sm("do_Notification");
var do_Page = deviceone.sm("do_Page");
 //按下动画
module.exports.player = function(sid){
	 
	    var mp3
		var musicUrl = 'https://api.imjad.cn/cloudmusic/?id=' + sid
		 
		var http =deviceone.mm("do_Http");
		http.method = "POST";  // GET | POST
		http.timeout = 20000; // 超时时间 : 单位 毫秒
		http.contentType = "application/json"; // Content-Type
		http.url = musicUrl; // 请求的 URL
//		http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
		http.on("success", function(data) {
                mp3=data.data[0].url
			     
			 if(mp3){
				 play.playAsync(mp3,function(data){
					 
					 nf.alert(data)
				 })
				 
			 }else{
				 nf.toast(JSON.stringify("音乐错误，无法播放")) 
			 
			 }
	 });
		http.on("fail", function(data) {
			//去掉遮盖
			nf.toast(data.message)
			if(loadingUI2.visible=true){
				loadingUI2.visible = false;
			}
	 
//			do_ListView_news.rebound();
			//do_Notification.toast(data);
	     nf.toast("网络故障"); //比具体的错误提示更容易懂
	     
		});
		http.request();
}
module.exports.stop = function(sid){
	 play.stop()
 
}
module.exports.resume = function(sid){
	 play.resume()

}
module.exports.pause = function(sid){
	 play.pause()

}