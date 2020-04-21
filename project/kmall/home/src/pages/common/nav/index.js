/*
* @Author: Chen
* @Date:   2019-12-17 10:39:07
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 10:19:52
*/
require('./index.css')
var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		//加载用户名
		this.loadUsername()
		this.bindEvent()
		//加载购物车数量
		this.loadCarts()
		return this
	},
	loadCarts:function(){
		var $cartNum = $('.nav-list .cart-num')
		api.getCartsCount({
			success:function(count){
				$cartNum.text(count || 0)
			},
			error:function(){
				$cartNum.text(0)
			}
		})
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			api.logout({
				success:function(data){
					window.location.reload()
				},
				error:function(msg){
					_util.showErrMsg(msg)
				}
			})
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				// console.log(data)
				$('.nav .not-login').hide()
				$('.nav .login').show()
				.find('.username')
				.text(data.username)
			}
		})
	}
}

module.exports = page.init()