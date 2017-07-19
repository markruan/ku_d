
//引入组件库
var fn = sm("do_Notification");

var do_App = sm("do_App");
var do_Page = sm("do_Page");
var datalist=mm('do_ListData')
 var datalist2=mm('do_ListData')
var do_ALayout=ui("do_ALayout_1")
var do_ListView=ui('do_GridView_1')
var huandeng=ui('do_SlideView_1')
var root=ui("$");  //$表示当前视图的根UI
var deviceone = require("deviceone");
var do_ScrollView_1=ui("do_ScrollView_1")
//中间滑块测试
var huakuai=ui("do_SegmentView_11")
huakuai.on("indexChanged",function(data) {
	fn.alert(data)
})

//在do_ALayout_root上动态添加子视图(用于等待数据装载的过程)
do_ALayout.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
var pageNum


root.on("dataRefreshed",function() {
	gethuainfo()
	getdata()


})
function getdata(){
     pageNum=0;
     var ye = pageNum * 18
    var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 20000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://v7idc.com/ku/api/fen.php?page="+ye; // 请求的 URL
//	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview状态
		if(data.length>0){
		do_ListView.rebound();
		datalist.removeAll()
		datalist.addData(data);
	    do_ListView.bindItems(datalist)
		huandeng.bindItems(datalist)
	    do_ListView.refreshItems()
		huandeng.refreshItems()

		}
		//去掉遮盖
	    loadingUI.visible = false;
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
	    //恢复do_ListView_news的headerview和footerview
//		do_ListView_news.rebound();
//		fn.toast(data);
		fn.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
	do_ScrollView_1.rebound();
}


//刷新数据
function getNextPageData(){
	pageNum++;
	var ye = pageNum * 18
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://v7idc.com/ku/api/fen.php?page="+ye; // 请求的 URL
//	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview状态

		if(data=="null"){

			 fn.toast("没有更多了")
		  }else{
			    do_ListView.rebound();
		         datalist.addData(data);
				 do_ListView.bindItems(datalist)
				 huandeng.bindItems(datalist)
				 do_ListView.refreshItems()
				 huandeng.refreshItems()
		  }


	});
	http.on("fail", function(data) {
		//恢复do_ListView_news的headerview和footerview
		do_ScrollView_1.rebound();
		//do_Notification.toast(data);
		fn.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
	do_ScrollView_1.rebound();
}
//上拉列表，翻页数据
do_ScrollView_1.on("push", function(data){
//	  fn.toast(data)
 	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
 	if (data.offset>5){
 		getNextPageData();
 	}
 });

//下拉列表，刷新数据
 do_ScrollView_1.on("pull", function(data){
 //其中state=0：表示开始下拉headerview，；state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){
		getdata();
	}
});

// 获取滑块数据
 function gethuainfo() {

		var http = mm("do_Http");
		http.method = "GET";  // GET | POST
		http.timeout = 30000; // 超时时间 : 单位 毫秒
		http.contentType = "application/json"; // Content-Type
		http.url = "http://v7idc.com/ku/api/tui.php"; // 请求的 URL
//		http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
		http.on("success", function(data) {
			if(data!="null"){
			 datalist2.addData(data);
			 huakuai.bindItems(datalist2)
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
