/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 16:43:43
*/
//引入common中逻辑
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
require('util/pagination')

require('./index.css')
var cartTpl = require('./index.tpl')

var page = {
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		//绑定事件
		this.bindEvent()
		//加载购物车数据
		this.loadCarts()
	},
	bindEvent:function(){
		var _this = this
		//1.处理选择单个商品
		this.$cartBox.on('click','.select-one',function(){
			var $this = $(this)
			//选中
			//发送请求更新后台商品状态信息
			var productId = $this.parents('.product-item').data('product-id')
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:true
					},
					success:function(data){
						//更新数据重新渲染页面
						_this.renderCart(data)
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//2.处理选择全部商品
		this.$cartBox.on('click','.select-all',function(){
			var $this = $(this)
			//选中
			//发送请求更新后台商品状态信息
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						checked:true
					},
					success:function(data){
						//更新数据重新渲染页面
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					}
				})
			}
		})
		//3.处理删除单个商品:需要传入单个商品的ID
		this.$cartBox.on('click','.delete-one',function(){
			var $this = $(this)
			//选中
			//发送请求更新后台商品状态信息
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.showConfirm('您确定要删除该条商品吗?')){
				api.deleteCarts({
					data:{
						productId:productId,
					},
					success:function(data){
						//更新数据重新渲染页面
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//4.处理删除选中的商品:不需要传递参数,选中状态都存在后台
		this.$cartBox.on('click','.delete-selected',function(){
			//发送请求更新后台商品状态信息
			if(_util.showConfirm('您确定要删除选中的商品吗?')){
				api.deleteCarts({
					success:function(data){
						//更新数据重新渲染页面
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})
		//5.处理增加/减少商品
		this.$cartBox.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $this.siblings('.count-input')
			//获取当前商品ID
			var productId = $this.parents('.product-item').data('product-id')
			//获取当前数量
			var current = parseInt($input.val())
			//获取库存
			var stock = $input.data('stock')
			var count = current
			//减少
			if($this.hasClass('minus')){
				if(count <= 1){
					_util.showErrMsg('商品数量不能少于一件')
					return 
				}
				count = current - 1
			}
			//增加
			else if($this.hasClass('plus')){
				if(count >= stock){
					_util.showErrMsg('商品数量达到上限')
					return 
				}
				count = current + 1
			}

			//发送请求更新数量
			api.updateCartsCounts({
				data:{
					productId:productId,
					count:count
				},
				success:function(data){
					//更新数据重新渲染页面
					_this.renderCart(data)
				},
				error:function(){
					_this.showErrPage()
				}
			})
		})
		//6.点击结算
		this.$cartBox.on('click','.btn-submit',function(){
			if(_this.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrMsg('请选择需要结算的商品')
			}
		})
	},
	renderCart:function(data){
		//重新加载购物车数量数据实时保持一致
		_nav.loadCarts()

		if(data.cartList.length > 0){
			//缓存商品总价用来提交验证
			this.totalCartPrice = data.totalCartPrice

			var html = _util.render(cartTpl,data)
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">您的购物车空空如也...</p>')
		}
	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(data){
				/*
				if(data.cartList.length > 0){
					var html = _util.render(cartTpl,data)
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">您的购物车空空如也...</p>')
				}
				*/
				_this.renderCart(data)
			},
			error:function(){
				_this.showErrPage()
			}
		})
	},
	showErrPage:function(){
		this.$cartBox.html('<p class="empty-message">请求页面出错啦,请稍后再试!!!</p>')
	}
}

$(function(){
	page.init()
})
