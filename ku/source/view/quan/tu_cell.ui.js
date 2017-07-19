/**
 * related to tu_cell.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
  
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var imageBrowser = sm("do_ImageBrowser");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var tupian=ui("tupian")
var imgbtn=ui("imgbtn")
var nf = sm("do_Notification");
//设置数据绑定的映射关系
root.setMapping({
	 "tupian.source":"tupian",
		 "tupian.tag":"index",
		 "imgbtn.tag":"imgdata"
});
imgbtn.on("touch",function() {
 var imgdata=eval(imgbtn.tag)
 var index=tupian.tag
 var data=[]
 if(imgbtn.tag==000){
	data=[{"source":tupian.source,"init":tupian.source}] 
	 
 }
 for (var i = 0; i < imgdata.length; i++) {
	var aa={}
	aa.source=imgdata[i][0]
	aa.init=imgdata[i][0]
	data[i]=aa
}
 imageBrowser.show(data,index) 
})
 