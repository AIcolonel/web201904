/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 11:01:51
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')
require('util/pagination')

require('./index.css')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')


var page = {
	init:function(){
		this.shippingBox = $('.shipping-box')
		this.productBox = $('.product-box')
		this.loadShippingList()
		this.loadProductList()
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		//监听自定义事件获取新增地址后最新地址信息
		this.shippingBox.on('get-shipping',function(ev,shippings){
			// console.log('trigger::',shippings)
			_this.renderShipping(shippings)
		})
		//1.点击新增地址
		this.shippingBox.on('click','.shipping-add',function(){
			//显示弹出层(由于新增地址逻辑比较复杂所以讲该逻辑再抽取到一个文件中)
			_modal.show()
		})

		//2.点击删除地址
		this.shippingBox.on('click','.shipping-delete',function(ev){
			//阻止事件冒泡防止点击时该地址状态变成active
			ev.stopPropagation()
			var $this = $(this)
			if(_util.showConfirm('你确定要删除该条地址吗?')){
				var shippingId = $this.parents('.shipping-item').data('shipping-id')
				api.deleteShippings({
					data:{
						id:shippingId
					},
					success:function(shippings){
						//输出后返回最新地址数据进行渲染
						_this.renderShipping(shippings)
					}
				})
			}
		})
		//3.点击编辑地址
		this.shippingBox.on('click','.shipping-edit',function(ev){
			//阻止事件冒泡防止点击时该地址状态变成active
			ev.stopPropagation()
			var $this = $(this)
			//通过ID获取当前地址信息
			var shippingId = $this.parents('.shipping-item').data('shipping-id')
			api.getShippingsDetail({
				data:{
					id:shippingId
				},
				success:function(shipping){
					//获取地址信息弹出面板进行数据回填
					_modal.show(shipping)
				}
			})
		})

		//4.点击选中地址处理
		this.shippingBox.on('click','.shipping-item',function(){
			var $this = $(this)
			$this.addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')
			//当编辑或删除成功后地址会重新渲染,此时地址的选中状态会消失
			//因此需要将选中的地址状态保存下来
			_this.selectShippingId = $this.data('shipping-id')
		})

		//5.点击支付功能
		this.productBox.on('click','.btn-submit',function(){
			var $this = $(this)
			//点击支付创建订单成功后去到支付页面
			//必须选择送货地址,否则不能创建订单,并且需要把地址ID传递到后台生成地址信息
			if(_this.selectShippingId){
				api.addOrders({
					data:{
						shippingId:_this.selectShippingId
					},
					success:function(order){
						// console.log(order)
						window.location.href = './payment.html?orderNo='+order.orderNo
					}
				})
			}else{
				_util.showErrMsg('请选择收货人地址')
			}
		})
	},
	renderShipping:function(shippings){
		//处理当页面重新渲染是仍然保存地址的选中状态
		var _this = this
		// console.log(this.selectShippingId)
		shippings.forEach(function(shipping){
			if(shipping._id == _this.selectShippingId){
				shipping.active = true
			}
		})


		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.shippingBox.html(html)
	},
	loadShippingList:function(){
		var _this = this
		//获取该用户下的地址信息
		api.getShippings({
			success:function(shippings){
				// console.log(shippings)
				/*
				var html = _util.render(shippingTpl,{
					shippings:shippings
				})
				_this.shippingBox.html(html)
				*/
				_this.renderShipping(shippings)
			}
		})
		
	},
	loadProductList:function(){
		var _this = this
		api.getOrdersProducts({
			success:function(data){
				// console.log(data)
				if(data.cartList.length > 0){
					var html = _util.render(productTpl,data)
					_this.productBox.html(html)
				}else{
					_this.productBox.html('<p class="empty-message">您的购物车没有商品</p>')
				}
				
			},
			error:function(){
				_this.productBox.html('<p class="empty-message">获取商品信息失败,请重试</p>')
			}
		})
		
	},
}

$(function(){
	page.init()
})
