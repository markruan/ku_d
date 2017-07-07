/**
 * related to quan_cell0.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
 
var icon=ui("icon")
var username=ui("username")
var qianming=ui("qianming")
var tulist=ui("tu_list")
var listData = mm("do_ListData");

var initdata=[{
	tupian:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497491655569&di=1a49d4ef4ecca33c7c6592bf173a4e37&imgtype=0&src=http%3A%2F%2Fwww.soideas.cn%2Fuploads%2Fallimg%2F110626%2F2214291S1-10.jpg"
},{tupian:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497491655569&di=60ee3db88345918e16f3c258e650a6ae&imgtype=0&src=http%3A%2F%2Fimg2.zol.com.cn%2Fup_pic%2F20130208%2Fz12GBF4TCc0jE.jpg"
},{tupian:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497491655559&di=c4e34f4cf61950beea22f69200e168cf&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-02-01%2F055412513.jpg"},{tupian:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497491655559&di=c4e34f4cf61950beea22f69200e168cf&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-02-01%2F055412513.jpg"}]

listData.addData(initdata)
tulist.bindItems(listData)


//设置数据绑定的映射关系
root.setMapping({
	"username.text":"name",
	 "qianming.text":"qiangming",
	"icon.source":"icon"
});