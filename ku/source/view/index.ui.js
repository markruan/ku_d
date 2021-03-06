/**
 * related to index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-12
 */
// 引入组件库
var d1 = require("deviceone");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var root_layout = ui("index_layout")
var nf = sm("do_Notification");
var open_kong = ui("open_kong")
var menu = ui("menu")
var tab1 = ui("tab1")
var tab2 = ui("tab2")
var line1 = ui("line1")
var line2 = ui("line2")
var title1 = ui("title1")
var title2 = ui("title2")
var songname = ui("songname")
var play = require("play");
var playbtn = ui("playbtn")
var playtouch = ui("playtouch")
var do_Global = sm("do_Global")
var nextbtn = ui("next")
var prvbtn = ui("prv")
var do_Storage = sm("do_Storage");
// 根据ID获取SlideView实例对象；
var slideView = ui("do_SlideView_3");
// 创建一个ListData集合对象；
var listData = mm("do_ListData");
// 为listData添加初始化数据；
listData.addData([ {
	template : 0
}, {
	template : 1
} ]);

// 给SlideView绑定一个listData；
slideView.bindItems(listData);
root_layout.add("kong", "source://view/kong/index.ui", 0, 129);
var kongui = ui("kong")
kongui.visible = false
// 控制图层显示
do_App.on("yincangkong", function() {
	kongui.visible = false
	open_kong.tag = 0
})
open_kong.on("touch", function() {
	if (open_kong.tag == 0) {
		// 打开控制图层
		kongui.visible = true
		open_kong.tag = 1

	} else {
		// 关闭控制图层
		kongui.visible = false
		open_kong.tag = 0
	}

})

slideView.on("indexChanged", function(data) {
	if (data == 1) {
		line2.visible = true
		line1.visible = false
		title2.fontColor = "FF0033FF"
		title1.fontColor = "000000FF"
	} else {
		line2.visible = false
		line1.visible = true
		title2.fontColor = "000000FF"
		title1.fontColor = "FF0033FF"

	}
})

menu.on("touch", function() {

	// index0里订阅消息
	do_App.fire("showleft")

})
// title1 切换

tab1.on("touch", function() {

	if (slideView.index == 0) {

	} else {
		slideView.index = 0

	}

})
tab2.on("touch", function() {

	if (slideView.index == 0) {
		slideView.index = 1

	} else {
		slideView.index = 0

	}

})

// # message1圈子页面音乐播放监听
do_App.on("songxinxi", function(d) {
	songname.text = d.songname + "-" + d.artist
	playbtn.source = "source://image/zanting.png"
	playtouch.tag = 0
	play.player(d.songid)
	nextbtn.tag = d.sindex

});

playtouch.on("touch", function(d) {
	// nf.alert(playtouch.tag)
	if (playtouch.tag == 1) {
		playbtn.source = "source://image/zanting.png"
		playtouch.tag = 0
		play.resume()
	} else {
		playtouch.tag = 1
		play.pause()
		playbtn.source = "source://image/play.png"
	}
})
// 搜索按钮
var searchbtn = ui("searchbtn")
searchbtn.on("touch", function(d) {
	do_App.openPage({
		source : "source://view/sou/sou_index.ui",
		keyboardMode : "visible",
		animationType : "fade", // 动画效果：从右向左推出
		statusBarState : "transparent",
	// data:JSON.stringify({title:do_Label_title.text, listid:listid})
	// //传递页面之间的参数
	});
})

// 目录数据

nextbtn.on("touch", function() {
	play_next()

})

var sid
var songlist, songname1
function play_next() {

	do_Storage.readFile("data://mlist.txt", function(data, e) {
		d1.print(data)
		songlist = eval(data)
		play.stop()
		var index = parseInt(nextbtn.tag)
		// nf.toast(index)
		var num_next = parseInt(nextbtn.tag) + parseInt(1)
		songname1 = songlist[index].name + '-'
				+ songlist[index].artists[0].name
		songname.text = songname1
		sid = songlist[index].id
		if (index == songlist.length) {
			nextbtn.tag = 0
			paly.player(sid)
		} else {
			nextbtn.tag = num_next
			play.player(sid)
		}

	})

}

var aplay = sm('do_Audio')
aplay.on('playFinished', function() {

	play_next()
})
