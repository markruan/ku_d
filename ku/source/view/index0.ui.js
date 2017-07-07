/**
 * related to index0.ui
 *
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var nf = sm("do_Notification");
var do_FragmentView=ui("do_FragmentView_1")
var listData = mm("do_ListData");
var root_layout=ui("root_layout")

var app = sm("do_App");

//当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
  canBack = false;
});
do_Page.on("back", function(){
  if (canBack) {
  	do_Global.exit();
  } else {
	  nf.toast("再次点击退出应用");
      canBack = true;
      delay3.start();
  }
});

//模板初始化
listData.addData([{ template:0 ,leftTemplate:1}])
do_FragmentView.bindItems(listData)
app.on("showleft",function() {
	do_FragmentView.showLeft()
})
