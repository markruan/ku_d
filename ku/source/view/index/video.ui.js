/**
 * related to video.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-10-01
 */
var d1 = require("deviceone");
var do_VideoView = ui('do_VideoView_1')
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var songname=ui('songname')
var artistName=ui("artistName")
var para = do_Page.getData()
var vid = para.vid
// 订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function() {
	do_App.closePage();
});
// 获取视频地址
init(vid)
function init(vid) {

	var url
	var http = mm("do_Http");
	http.method = "GET"; // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "https://api.imjad.cn/cloudmusic/?type=mv&id=" + vid; // 请求的
	// URL
	// http.body = JSON.stringify({id:type_id, page:pageNum}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data1) {

		if (data1.code == 200) {
			do_VideoView.path = data1.data.brs[720]
			do_VideoView.play()
			songname.text=data1.data.name 
			artistName.text=data1.data.artistName
			// do_VideoView.expand({
			// isFullScreen : true
			// });
		}
	});
	http.on("fail", function(data) {
		// 恢复do_ListView_news的headerview和footerview
		do_ListView.rebound();
		// do_Notification.toast(data);
		fn.toast("网络故障"); // 比具体的错误提示更容易懂
	});
	http.request();
}

do_VideoView.on("error", function(data, e) {
	d1.print(data, "结束返回")
})