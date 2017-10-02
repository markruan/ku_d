/**
 * related to bofang.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-10
 */
// 引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global")
var deviceone = require("deviceone");
var songname = ui('songname')
var playicon = ui('play_icon')
var play_bg = ui('play_bg')
var bgimg = ui("bgimg")
var nf = sm("do_Notification");
var play = sm('do_Audio')
var ProgressBar = ui('do_ProgressBar_1')
var time1 = ui("time1")
var next_icon = ui("next_icon")
var artist = ui("artist")
var back_icon = ui("back_icon")
var timet = ui("timet")
var do_back = ui("do_back")
var count

var do_SeekBar = ui("do_SeekBar_1")
var repeat = ui("repeat")
var repeat_touch = ui("repeat_touch")
var rootlay = ui("rootlayout")
// var share=sm('M0011_share');
var wxBtn = ui("wx_share_btn")
var prev_btn = ui("prev_btn")
var do_DataCache = sm("do_DataCache")
var do_Storage = sm("do_Storage");
// 播放组件
var playjs = require("play");

// 订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function() {
	// do_App.fire("hidden_bofang");
	do_App.closePage()

});

// 关闭当前页面
back_icon.on("touch", function() {
	// do_App.fire("hidden_bofang");
	do_App.closePage()

});
play_bg.on("touch", function() {
	if (playicon.tag == 1) {
		play.pause()
		playicon.source = "source://image/play.png"
		playicon.tag = "-1"
		// 暂停旋转
		bgimg.animate(label_anima1);

	} else {
		play.resume()
		playicon.source = "source://image/zanting.png"
		playicon.tag = "1"
		bgimg.animate(label_anima);

	}

});
// 下一曲
next_icon.on("touch", function() {
	play_next()

})
// 上一曲
prev_btn.on("touch", function() {
	play_prv()

})
// 页面装载完成后，开始初始化工作
var loadingUI2
do_Page.on("loaded", function() {
	// 读取当前页面的传入参数
	rootlay.add("loadingUI2", "source://view/loadingUI2.ui", 0, 47);
	loadingUI2 = ui("loadingUI2");
	var para = do_Page.getData()
	songname.text = para.name
	songname.tag = para.songid
	bgimg.source = para.bgimg
	artist.text = para.artist
	artist.tag = para.index
	play.stop()
	do_App.fire("songxinxi", JSON.stringify({
		songname : songname.text,
		artist : artist.text,
		songid : songname.tag,
		sindex : para.index
	}))
	do_App.fire("savelist")

	bgimg.animate(label_anima);
	loadingUI2.visible = false;

})

// 图片旋转
var label_anima = mm("do_Animation");
label_anima.fillAfter = true;
label_anima.rotate({
	delay : 0,
	duration : 8800,
	curve : "Linear",
	repeatCount : -1,
	autoReverse : false,
	fromDegree : 0,
	toDegree : 360,
	pivotX : 0.5,
	pivotY : 0.5

}, "start3");
// 图片旋转暂停
var label_anima1 = mm("do_Animation");
label_anima1.fillAfter = true;
label_anima1.rotate({
	delay : 0,
	duration : 1,
	curve : "Linear",
	repeatCount : 1,
	autoReverse : false,
	fromDegree : 0,
	toDegree : 360,
	pivotX : 0.5,
	pivotY : 0.5

}, "start3");

// 获取时间
play.on('playProgress', function(data) {

	// nf.toast(JSON.stringify(data));

	var total_time = data.totalTime
	var current_time = data.currentTime

	var progress = (current_time / total_time) * 100
	 time1.text = formatSeconds(current_time / 1000)
	 timet.text = formatSeconds(total_time / 1000)
	timet.tag = total_time
	ProgressBar.progress = Math.round(progress)
	// do_SeekBar.progress = Math.round(progress)

})

play.on('playFinished', function() {

	// 暂停旋转
	bgimg.animate(label_anima1);
	if (repeat.tag == 0) {
		play.play(songname.tag)
		bgimg.animate(label_anima);
	} else {
		play_next()
	}

})

function formatSeconds(value) {
	var theTime = parseInt(value);
	// 秒
	var theTime1 = 0;
	// 分
	var theTime2 = 0;
	// 小时 // alert(theTime);
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		// alert(theTime1+"-"+theTime);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var result = "" + parseInt(theTime) + "";
	if (result < 10) {
		var result = "0" + parseInt(theTime) + "";
		if (10 > theTime1 > 0) {
			result = "0" + parseInt(theTime1) + ":" + result;
		} else {
			result = "" + parseInt(theTime1) + ":" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + ":" + result;
		}
		return result;
	} else {
		if (10 > theTime1 > 0) {
			result = "0" + parseInt(theTime1) + ":" + result;
		} else {
			result = "" + parseInt(theTime1) + ":" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + ":" + result;
		}
		return result;
	}
}
var sid
var songlist
function play_next() {

	do_Storage.readFile("data://mlist.txt", function(data, e) {

		songlist = eval(data)
		play.stop()
		loadingUI2.visible = true;
		var num = parseInt(artist.tag) + parseInt(1)
		// nf.toast(num+'1')
		if (num == songlist.length) {
			next_icon.tag = 0
			sid = songlist[num].id
			songname.text = songlist[num].name
			bgimg.source = songlist[num].album.picUrl
			artist.text = songlist[num].artists[0].name
			playjs.player(sid)
			loadingUI2.visible = false;
		} else {
			sid = songlist[num].id
			songname.text = songlist[num].name
			bgimg.source = songlist[num].album.picUrl
			artist.text = songlist[num].artists[0].name
			artist.tag = num
 		    playjs.player(sid)
 		   loadingUI2.visible = false;

		}
	})

}

function play_prv() {
	loadingUI2.visible = true;
	var sid
	play.stop()
	var num = parseInt(artist.tag) - parseInt(1)
	// nf.toast(num+'2')
	if (num < 0) {
		artist.tag = 0
		sid = songlist[0].id
		songname.text = songlist[0].name
		bgimg.source = songlist[0].album.picUrl
		artist.text = songlist[0].artists[0].name
		artist.tag = 0
		play(sid)
	} else {
		sid = songlist[num].id
		songname.text = songlist[num].name
		bgimg.source = songlist[num].album.picUrl
		artist.text = songlist[num].artists[0].name
		artist.tag = num
		play(sid)
	}

}

repeat_touch.on("touch", function() {
	if (repeat.tag == 1) {
		repeat.source = "source://image/xunhuan1.png"
		repeat.tag = 0
		nf.toast("单曲循环")
	} else {
		repeat.source = "source://image/xunhuan.png"
		repeat.tag = 1
		nf.toast("列表循环")

	}

})

// play.on("error", function(data) {
// nf.alert(data)
//
// })
wxBtn.on("touch", function() {
	nf.toast("微信分享")
	share.share({
		title : "标题",
		content : "分享文本内容"
	}, function(data, e) {
		nf.alert({
			text : data,
			title : "分享返回结果"
		}, function(data, e) {
		});
	});

})

function shoucang() {
	// http
	var musicUrl = 'http://v7idc.com/ku/api/mylist.php'
	var http = mm("do_Http");
	http.method = "POST"; // GET | POST
	http.timeout = 20000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = musicUrl; // 请求的 URL
	http.body = JSON.stringify({
		id : type_id,
		page : pageNum
	}); // 传入新闻类型ID和页码的参数
	http.on("success", function(data) {
	});
	http.on("fail", function(data) {
		// 去掉遮盖
		nf.toast(data.message)

		nf.toast("网络故障"); // 比具体的错误提示更容易懂
		// deviceone.print(data)

	});
	http.request();

}