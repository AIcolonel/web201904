/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 15:03:15
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')

var api = require('api')
var _util = require('util')
require('util/pagination')

require('./index.css')
var detailTpl = require('./index.tpl')

var page = {
	orderDetailParams:{
		orderNo:_util.getParamsFromUrl('orderNo') || '',
	},
	init:function(){
		this.$orderBox = $('.order-box')
		//渲染侧边栏
		this.renderSide()
		this.loadOrdersDetail()
		//监听事件
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	loadOrdersDetail:function(){
		var _this = this
		api.getOrdersDetail({
			data:this.orderDetailParams,
			success:function(order){
				// console.log(order)
				_this.renderOrderDetail(order)
			}
		})
	},
	renderOrderDetail:function(order){
		if(order){
			order.createdTime = new Date(order.createdAt).toLocaleString()
			//如果订单已支付则不能够再次去支付或是取消
			order.canPay = order.canCancel = order.status == 10
			var html = _util.render(detailTpl,order)
			this.$orderBox.html(html)
		}else{
			this.$orderBox.html('<p class="empty-message">没有该订单</p>')
		}
	},
	bindEvent:function(){
		var _this = this
		//点击取消订单
		this.$orderBox.on('click','.btn-cancel',function(){
			var $this = $(this)
			if(_util.showConfirm('您确定要取消该订单吗?')){
				var orderNo = $this.data('order-no')
				api.updateOrdersStatus({
					data:{
						orderNo:orderNo,
						status:20
					},
					success:function(order){
						_this.renderOrderDetail(order)
					},
					error:function(msg){
						_util.showErrMsg(msg)
					}
				})
			}
		})
	}
}

$(function(){
	page.init()
})
