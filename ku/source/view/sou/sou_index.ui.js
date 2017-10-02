/**
 * related to sou_index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-07-23
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global=sm("do_Global")
var do_ALayout_back = ui("do_ALayout_back1");
var datalist=mm('do_ListData')
var do_ListView=ui("do_ListView_1")
var nf = sm("do_Notification");
var key=ui("key")
var searchb=ui("searchb")
var deviceone = require("deviceone");
//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});
searchb.on("touch", function(){
	search()
});

var data=[{"name":"历史","artists":[{name:"测试"}]}]
	datalist.addData(data);
	do_ListView.bindItems(datalist)
	
function search() {
		var s=key.text
		var sUrl = 'http://s.music.163.com/search/get/?src=lofter&type=1&filterDj=true&s='
		var sEnd = '&limit=100&offset=0&callback'
		var url = sUrl + s + sEnd
		var http = mm("do_Http");
		http.method = "POST";  // GET | POST
		http.timeout = 30000; // 超时时间 : 单位 毫秒
		http.contentType = "application/json"; // Content-Type
		http.url = url; // 请求的 URL
//		http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
		http.on("success", function(data) {
			//恢复do_ListView_news的headerview和footerview状态

			if(!data.result){

				 nf.toast("没有数据")
			  }else{
				      
				     deviceone.print(JSON.stringify(data))
				     datalist.removeAll()
			         datalist.addData(data.result.songs);
					 do_ListView.bindItems(datalist)
					 do_ListView.refreshItems()
					 
			  }


		});
		http.on("fail", function(data) {
			//恢复do_ListView_news的headerview和footerview
			do_ListView.rebound();
			//do_Notification.toast(data);
			fn.toast("网络故障"); //比具体的错误提示更容易懂
		});
		http.request();
	
}	
	key.on("focusIn",function(){
//		key.hint=""
	})
	key.on("enter",function(){
		search()
	})