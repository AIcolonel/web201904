/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 15:28:00
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
require('util/pagination')

require('./index.css')
var paymentTpl = require('./index.tpl')

var page = {
	paymentParams:{
		orderNo:_util.getParamsFromUrl('orderNo'),
	},
	init:function(){
		//定义定时器
		this.timer = 0

		this.$elem = $('.payment-box')
		//加载支付信息
		this.loadPayment()
	},
	loadPayment:function(){
		var _this = this
		if(this.paymentParams.orderNo){
			api.getPayments({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(payment){
					var html = _util.render(paymentTpl,payment)
					_this.$elem.html(html)

					//加载支付页面后需要监听订单状态,如果已支付则需要跳转到结果页
					_this.listenPaymentStatus()
				},
				error:function(){
					_this.$elem.html('<p class="empty-message">获取支付信息失败,请重试</p>')
				}
			})
		}else{
			this.$elem.html('<p class="empty-message">没有订单,请重新跳转页面</p>')
		}
		
	},
	listenPaymentStatus:function(){
		var _this = this
		//利用定时器每隔一定时间获取订单支付状态
		this.timer = setInterval(function(){
			api.getPaymentsStatus({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(status){
					// console.log(status)
					if(status){
						window.location.href = './result.html?type=payment&orderNo='+_this.paymentParams.orderNo
					}
				}
			})
		},1000)
	}
}

$(function(){
	page.init()
})
