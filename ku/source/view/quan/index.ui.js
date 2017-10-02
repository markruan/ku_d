/**
 * related to index.ui
 *
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
var d1 = require("deviceone");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_ListView_1=ui("do_ListView_1")
var fn = sm("do_Notification");
//创建一个ListData集合对象；
var listData = mm("do_ListData");
var page

do_Page.on("loaded", function(){
 getinfo()
 
})

function getinfo(){
//	http
	page=0
	var ye = page * 10
    var musicUrl = 'http://v7idc.com/ku/api/quan123.php?page=' + ye;
    var http = mm("do_Http");
	http.method = "GET";  // GET | POST
	http.timeout = 20000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = musicUrl; // 请求的 URL
// 	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {

	for (var i = 0; i < data.length; i++) {
		if(data[i].type==0){
			data[i].template=1
		 }else{
			data[i].template=0
			var pi=[]
			var imgdata=[]

		    if(data[i].tushu>0){
		    	   var piccdata=JSON.parse(data[i].cover)
			   for (var j = 0; j < piccdata.length; j++) {
					 var aa={}

					 aa.tupian=piccdata[j][0]

					 aa.imgdata=piccdata
					 aa.index=j
					 pi[j]=aa

				}
				data[i].picc=pi

		   }else{
			   var aa={}
			   aa.tupian=data[i].cover
			   aa.index=0;
			   aa.imgdata=000
			   pi[0]=aa
			   data[i].picc=pi
		   }

//			d1.print(JSON.stringify(data))

       }
	}
	   listData.removeAll()
// 	    d1.print(JSON.stringify(data))
		listData.addData(data);
		do_ListView_1.bindItems(listData)
	    do_ListView_1.rebound();

	});
	http.on("fail", function(data) {
		//去掉遮盖
		nf.toast(data.message)


     nf.toast("网络故障"); //比具体的错误提示更容易懂
     deviceone.print(data)

	});
	http.request();



}

function getNextPageData(){
	page++;
	var ye = page * 10
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://v7idc.com/ku/api/quan123.php?page="+ye; // 请求的 URL
//	http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview状态
		for (var i = 0; i < data.length; i++) {
			if(data[i].type==0){
				data[i].template=1
			 }else{
				data[i].template=0
				var pi=[]

			    if(data[i].tushu>0){
			    	   var piccdata=JSON.parse(data[i].cover)
				   for (var j = 0; j < piccdata.length; j++) {
						 var aa={}
						 aa.tupian=piccdata[j][0]
						 aa.imgdata=piccdata
						 aa.index=j
						 pi[j]=aa
					}
					data[i].picc=pi
			   }else{
				   var aa={}
				   aa.tupian=data[i].cover
				   aa.imgdata=000
				   aa.index=0
				   pi[0]=aa
				   data[i].picc=pi
			   }



	       }
		}
		if(!data.length){
			fn.toast("没有更多了")
		  }
		do_ListView_1.rebound();
		listData.addData(data);
		do_ListView_1.bindItems(listData)
		do_ListView_1.rebound();



	});
	http.on("fail", function(data) {
		//恢复do_ListView_news的headerview和footerview
		do_ScrollView_1.rebound();
		//do_Notification.toast(data);
		fn.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
	do_ListView_1.rebound();
}
var rootlay=ui("do_ListView_1")
//上拉列表，翻页数据
rootlay.on("push", function(data){

 	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
 	if (data.offset>5){
 		getNextPageData();
 	}
 });

//下拉列表，刷新数据
rootlay.on("pull", function(data){
 //其中state=0：表示开始下拉headerview，；state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){
		getinfo()
	}
});
