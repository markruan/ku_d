/**
 * related to songlist.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-10
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var nf = sm("do_Notification");
var song_index=ui("song_index")
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
 
var rootlayout=ui('rootlayout')
var songname=ui("songname");
var artists=ui("artists");
 

//设置数据绑定的映射关系
root.setMapping({
	"songname.text":"name",
 	"artists.text":"artists:0.name",
	"rootlayout.tag":"id",
	"artists.tag":"album.picUrl",	
	"song_index.text":"index"
});

rootlayout.on("touch", function(data){
	 do_App.openPage({
		source:"source://view/bofang.ui", 
		animationType:"push_b2t", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({name:songname.text,bgimg:artists.tag, songid:rootlayout.tag,index:song_index.text,artist:artists.text}) //传递页面之间的参数
	});
 	
	
//	do_App.fire("open_bofang",JSON.stringify({name:songname.text,bgimg:artists.tag, songid:rootlayout.tag,index:song_index.text,artist:artists.text}) )
});