/**
 * related to quan_cell0.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var d1 = require("deviceone");
var nf = sm("do_Notification");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
 
var icon=ui("icon")
var username=ui("username")
var qianming=ui("qianming")
var songpic=ui("songpic")
var songname=ui("songname")
 var artistt=ui("artistt")
 var songnametouch=ui("songnametouch")
 var play=require("play");
var bobtn=ui("bobtn")
 


//设置数据绑定的映射关系
root.setMapping({
	"username.text":"nickname",
	 "qianming.text":"signature",
	"icon.source":"pic",
	"songname.text":"title",
	"songpic.source":"cover",
	"artistt.text":"artist",
	"songname.tag":"sid",
 });
songnametouch.on("touch", function(){
	
 var mp3=songname.tag
 
 
 if(bobtn.tag==1){
	 bobtn.source="source://image/zan2.png" 
		 play.player(mp3)
		 bobtn.tag=0
		 nf.toast("播放")
		 do_App.fire("message1",JSON.stringify({songname:songname.text,artist:artistt.text}))
 }else{
	     bobtn.source="source://image/bo.png" 
		 play.stop()
		
		 nf.toast("停止")
 }
 
 
})
 
 
	