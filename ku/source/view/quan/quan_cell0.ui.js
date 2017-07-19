/**
// * related to quan_cell0.ui
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
var tulist=ui("tulist")
var listData = mm("do_ListData");
var vtext=ui("vtext")
//

//tulist.items=initdata
 
 

//设置数据绑定的映射关系
root.setMapping({
	 "tulist.items":"picc",
	 "username.text":"nickname",
	 "qianming.text":"signature",
	"icon.source":"pic",
	"vtext.text":"text"
   });
 