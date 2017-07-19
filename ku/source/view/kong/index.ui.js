/**
 * related to index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-13
 */
var nf = sm("do_Notification");
var kongbai=ui("kongbai")
var do_App = sm("do_App");
var tu=ui("tu")
var xiangce=sm("do_Camera")
var deviceone = require("deviceone");
kongbai.on("touch",function() {
	 
	do_App.fire("yincangkong")
})
tu.on("touch",function() {
	nf.confirm("选择","标题","按钮1","按钮2",function(data){
		nf.alert(data)
	})
	
	xiangce.capture(-1, 120, 100, true,function(data) {
	    deviceone.print(data);
	})
})