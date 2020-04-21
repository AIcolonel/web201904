/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 09:51:41
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')

require('./index.css')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.renderSide()
		this.getUserInfo()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	getUserInfo:function(){
		//获取用户信息
		api.getUserInfo({
			success:function(user){
				// console.log(user)
				var html = _util.render(tpl,user)
				$('.side-content').html(html)
			}
		})
	}
}
$(function(){
	page.init()
})