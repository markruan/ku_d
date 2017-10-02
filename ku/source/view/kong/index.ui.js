/**
 * related to index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-13
 */
var nf = sm("do_Notification");
var kongbai = ui("kongbai")
var do_App = sm("do_App");
var tu = ui("tu")
var xiangce = sm("do_Camera")
var deviceone = require("deviceone");
var root_alayout = ui("root_alayout")
var xuanzebtn = ui("xuanzebtn")
var music = ui("music")
var tubtn = ui("tubtn")
var xiangjibtn = ui("xiangjibtn")
var camera = sm("do_Camera");
xiangjibtn.on("touch", function() {
	camera.capture(-1, 120, 50, true, function(data) {// width : -1
		// 代表以height为基准
		// (保持原图横纵比)缩放;
		deviceone.print(JSON.stringify(data))

	})
})
music.on("touch", function() {
	do_App.openPage({
		source : "source://view/sou/sou_index.ui",
		keyboardMode : "visible",
		animationType : "fade", // 动画效果：从右向左推出
		statusBarState : "transparent",
	// data:JSON.stringify({title:do_Label_title.text, listid:listid})
	// //传递页面之间的参数
	});
})
tubtn.on("touch", function() {
	var album = sm("do_Album");
	album.select(9, 188, -1, 100, true, function(data, e) {
		deviceone.print(JSON.stringify(data));
		do_App.fire("yincangkong")
	})

})
kongbai.on("touch", function() {
	do_App.fire("yincangkong")
})
tu.on("touch", function() {
	xuanze()
})
function xuanze() {
	if (tu.tag == 0) {
		xuanzebtn.visible = true
		tu.tag = 1
	} else {
		tu.tag = 0
		xuanzebtn.visible = false
	}

}
