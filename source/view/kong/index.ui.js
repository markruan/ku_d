/**
 * related to index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-13
 */
var do_Notification = sm("do_Notification");
var kongbai=ui("kongbai")
var do_App = sm("do_App");
var tu=ui("tu")
kongbai.on("touch",function() {
	 
	do_App.fire("yincangkong")
})
tu.on("touch",function() {
	do_Notification.alert("图片")
})