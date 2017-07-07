/**
 * related to index.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
var d1 = require("deviceone");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_ListView_1=ui("do_ListView_1")
//创建一个ListData集合对象；
var listData = mm("do_ListData");
var intdata=[{
	name:"昵称",
	qiangming:"我是一道风景...",
	icon:"http://img1.touxiang.cn/uploads/20131227/27-075011_779.jpg"
	
},{
	name:"昵称1",
	qiangming:"我是一道风景...",
	icon:"http://img1.touxiang.cn/uploads/20131227/27-075011_779.jpg"
	
},{
	name:"昵称2",
	qiangming:"我是一道风景...",
	icon:"http://img1.touxiang.cn/uploads/20131227/27-075011_779.jpg"
	
},{
	name:"昵称3",
	qiangming:"我是一道风景...",
	icon:"http://img1.touxiang.cn/uploads/20131227/27-075011_779.jpg"
	
},]

listData.addData(intdata);
do_ListView_1.bindItems(listData)
