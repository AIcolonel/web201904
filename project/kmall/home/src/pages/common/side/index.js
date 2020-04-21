/*
* @Author: Chen
* @Date:   2019-12-18 16:31:36
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 09:33:14
*/
require('./index.css')
var Hogan = require('hogan.js')
var tpl = require('./index.tpl')
var _util = require('util')

module.exports = {
	render:function(name){
		var list = [
			{
				name:'user-center',
				link:'./user-center.html',
				desc:'用户中心'
			},
			{
				name:'order-list',
				link:'./order-list.html',
				desc:'我的订单'
			},
			{
				name:'user-update-password',
				link:'./user-update-password.html',
				desc:'修改密码'
			},
		]
		list.find(function(item){
			return item.name == name
		}).isActive = true
		/*
		var data = {
		  	screenName: "dhg",
		}
		var template = Hogan.compile("Follow @{{screenName}}.")
		var output = template.render(data)
		// prints "Follow @dhg."
		console.log(output)
		*/

		/*
		var template = Hogan.compile(tpl)
		var html = template.render({
			list:list
		})
		*/
		var html = _util.render(tpl,{
			list:list
		})
		$('.side').html(html)
	}
}