/**
 * related to login.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-14
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global=sm("do_Global")
var deviceone = require("deviceone");
var nf = sm("do_Notification");
var md=sm("do_Algorithm")
var do_Storage = sm("do_Storage");

var username=ui("username")
var psw=ui("psw")
var submit=ui("submit")
//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

username.on("enter",function(data) {
	if (username.text=="") {
		nf.alert("用户名不能为空")
	}
})

submit.on("touch",function(data) {

	 if(username.text==""||psw.text==""){
		 nf.alert("输入不完整，请重新输入")
		 
	 }else{
		 var info="?username="+username.text+"&password="+psw.text
//			http
			var musicUrl = 'http://v7idc.com/ku/api/login.php'+info;
			var http = mm("do_Http");
			http.method = "POST";  // GET | POST
			http.timeout = 30000; // 超时时间 : 单位 毫秒
			http.contentType =  "application/json"; // Content-Type
			http.url = musicUrl // 请求的 URL
// 			http.body = JSON.stringify({username:username.text,password:psw.text}); // 传入参数
			http.on("success", function(data) {
				 
				if(data.status==1){
					nf.toast(data.msg)
					do_Storage.writeFile("data://userinfo.txt",JSON.stringify(data.userdata),function(data,e) {
						 
					})
					do_App.fire("update_userinfo", JSON.stringify(data.userdata))
					do_App.closePage()
				}else{
					nf.toast(data.msg)
					
				}
               
			   
				 
			});
			http.on("fail", function(data) {
				//去掉遮盖
				loadingUI.visible = false;
			    //恢复do_ListView_news的headerview和footerview
				do_ListView_news.rebound();
				//do_Notification.toast(data);
		     nf.toast("网络故障"); //比具体的错误提示更容易懂
			});
			http.request();
		 
		 
	 }
})
