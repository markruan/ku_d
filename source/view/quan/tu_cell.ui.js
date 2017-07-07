/**
 * related to tu_cell.ui
 * 
 * @Author : markruan@qq.com
 * @Timestamp : 2017-06-15
 */
  
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var tupian=ui("tupian")
//设置数据绑定的映射关系
root.setMapping({
	 "tupian.source":"tupian"
});