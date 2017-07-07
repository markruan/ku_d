/**
 * related to ce_index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
var do_Storage = sm("do_Storage");
var do_Page = sm("do_Page");
var nf = sm("do_Notification");
var do_App = sm("do_App");
var denglu=ui("denglu")
var deviceone = require("deviceone");
var icon=ui("icon")
var username=ui("username")
var qianming=ui("qianming")
var ce_title=ui("ce_title1")


denglu.on("touch",function() {
	do_App.openPage({
		source:"source://view/login/login.ui", 
		animationType:"slide_r2l_1", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:null //传递页面之间的参数
	});
})
do_App.on("update_userinfo",function(data) {
	deviceone.print(data)
	var userdata=eval(data)
	icon.source=userdata.pic
	username.text=userdata.nickname
	qianming.text=userdata.signature
	ce_title.text="我的主页"
})

do_Page.on("loaded",function() {
 
	 do_Storage.readFile("data://userinfo.txt",  function(data, e) {
		 if(data){
			 var userinfo=eval(data)
				icon.source=userinfo.pic
				username.text=userinfo.nickname
				qianming.text=userinfo.signature
				ce_title.text="我的主页"
		 }
			
			
	 })
//   do_Storage.readFile("data://userinfo.txt",function(data) {
//   	if(data){
//   		deviceone(data)
//   	}
//	   
//   })
  
	
})