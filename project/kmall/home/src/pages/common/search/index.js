/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 10:30:49
*/

require('./index.css')


var page = {
	init:function(){
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-search').on('click',function(){
			_this.submit()
		})
		//监听键盘事件:回车键提交
		$('#search-input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val())
		//跳转到列表页
		window.location.href = '/list.html?keyword='+keyword
	},
}
$(function(){
	page.init()
})