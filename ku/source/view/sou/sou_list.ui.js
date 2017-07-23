/**
 * related to sou_list.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-07-23
 */
 
 
  
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var imageBrowser = sm("do_ImageBrowser");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var songname=ui("songname")
var artist=ui("artist")
var nf = sm("do_Notification");
var play=require("play");
var listbtn=ui("listbtn")
//设置数据绑定的映射关系
root.setMapping({
	  "songname.text":"name",
	  "artist.text":"artists:0.name",
	  "songname.tag":"id"	 
});
listbtn.on("touch",function(){
	 play.player(songname.tag)
	 
	
})
