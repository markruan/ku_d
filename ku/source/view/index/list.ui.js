//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ImageView_icon=ui("do_ImageView_icon");
var do_Label_title=ui("do_Label_title");


//设置数据绑定的映射关系
root.setMapping({
	"do_Label_title.text":"name",
	 
	"do_ALayout_root.tag":"idd",
	"do_ImageView_icon.source":"fenpic"
});
//点击查看当前新闻的详细内容
do_ALayout_root.on("touch", function(){
	var listid = do_ALayout_root.tag;
	
	do_App.openPage({
		source:"source://view/newsDetail.ui", 
		animationType:"slide_r2l_1", //动画效果：从右向左推出
		statusBarState:"transparent",
		id:"musiclist",
		data:JSON.stringify({title:do_Label_title.text, listid:listid}) //传递页面之间的参数
	});
});