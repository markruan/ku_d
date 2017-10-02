//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global")
// 声明UI变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");

var do_Label_title = ui("do_Label_title");

var do_cover = ui('do_cover')
var list_title = ui('list_title')
var avatarUrl = ui('avatarUrl')
var nickname = ui('nickname')
var nf = sm("do_Notification");
var songlist = ui('songlist')
var datalist = mm('do_ListData')
var do_DataCache = sm("do_DataCache")
// 在do_ALayout_root上动态添加子视图(用于等待数据装载的过程)
do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 129);
var loadingUI = ui("loadingUI");
var do_Storage = sm("do_Storage");
var listvalue

// 订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function() {
	do_App.closePage();
});

// 关闭当前页面
do_ALayout_back.on("touch", function() {
	do_App.closePage();
});
// 页面装载完成后，开始初始化工作
do_Page
		.on(
				"loaded",
				function() {
					// 读取当前页面的传入参数
					var para = do_Page.getData();
					var listid = para.listid;
					do_ALayout_root.tag = para.listid;

					if (do_DataCache.hasData(listid)) {

						var listdata = do_DataCache.loadData(listid)
						do_cover.source = listdata.coverImgUrl
						avatarUrl.source = listdata.creator.avatarUrl
						list_title.text = listdata.name
						nickname.text = listdata.creator.nickname

						var listdata = do_DataCache.loadData(listid)

						datalist.addData(listdata.tracks)
						songlist.bindItems(datalist)
						listvalue = JSON.stringify(listdata.tracks)
						do_Global.setMemory("songlist", listvalue)

//						writelist()
						loadingUI.visible = false;
						return

						

					}

					// http
					var musicUrl = 'http://music.163.com/api/playlist/detail?updateTime=-1&id=';

					var http = mm("do_Http");
					http.method = "POST"; // GET | POST
					http.timeout = 30000; // 超时时间 : 单位 毫秒
					http.contentType = "application/json"; // Content-Type
					http.url = musicUrl + do_ALayout_root.tag; // 请求的 URL

					http.on("success", function(data) {
						// 恢复do_ListView_news的headerview和footerview状态
						// do_ListView.rebound();

						if (data.code == 200) {
							var songlist1 = data.result

							var songlist2 = data.result.tracks

							for (var i = 0; i < songlist2.length; i++) {
								songlist1.tracks[i].index = i + 1
							}
							// nf.alert(JSON.stringify(songlist1[1]))
							do_cover.source = data.result.coverImgUrl
							avatarUrl.source = data.result.creator.avatarUrl
							list_title.text = data.result.name
							nickname.text = data.result.creator.nickname

							if (!do_DataCache.hasData(listid)) {

								datalist.addData(songlist1.tracks)
								songlist.bindItems(datalist)
								listvalue = JSON.stringify(songlist1.tracks)

								do_Global.setMemory("songlist", listvalue)
//								writelist()
								loadingUI.visible = false;

							}
							do_DataCache.saveData(listid, songlist1)
						}

					});
					http.on("fail", function(data) {
						// 去掉遮盖
						loadingUI.visible = false;
						// 恢复do_ListView_news的headerview和footerview
						do_ListView_news.rebound();
						// do_Notification.toast(data);
						nf.toast("网络故障"); // 比具体的错误提示更容易懂
					});
					http.request();
				});

do_App.on("open_bofang", function() {
	do_ALayout_root.add("bofang_ui", "source://view/bofang.ui", 0, 0);
	var bofang_ui = ui("bofang_ui");
})
function writelist() {
	do_Storage.writeFile("data://mlist.txt", listvalue, function(data, e) {
	})
}

do_App.on("songxinxi", function(d) {
	writelist()

});