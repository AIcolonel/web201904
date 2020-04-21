/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 11:04:12
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
require('util/pagination')

require('./index.css')
var detailTpl = require('./index.tpl')

var page = {
	productDetailParams:{
		id:_util.getParamsFromUrl('productId'),
	},
	init:function(){
		this.$detailBox = $('.detail-box')
		this.loadProductDetail()
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		//1.切换图片
		this.$detailBox.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			//添加选中处理
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active')
			//获取图片地址
			var imageUrl = $this.find('img').attr('src')
			$('.product-main-img img').attr('src',imageUrl)
		})
		//2.点击增加或减少购买数量
		this.$detailBox.on('click','.count-btn',function(){
			var $this = $(this)
			//获取输入框的值
			var $input = $('.count-input')
			var current = parseInt($input.val())
			//增加
			if($this.hasClass('plus')){
				$input.val(current < _this.stock ? current + 1 : _this.stock)
			}
			//减少
			else if($this.hasClass('minus')){
				$input.val(current >1 ? current - 1 : 1)
			}
		})
		//3.添加购物车
		this.$detailBox.on('click','.add-cart-btn',function(){
			var count = $('.count-input').val()
			api.addCarts({
				data:{
					productId:_this.productDetailParams.id,
					count:count
				},
				success:function(){
					//添加购物车成功,去到结果页
					_util.goResult('addCart')
				}
			})
		})
	},
	loadProductDetail:function(){
		var _this = this
		if(!this.productDetailParams.id){
			return 
		}
		api.getProductDetail({
			data:this.productDetailParams,
			success:function(product){
				if(product){
					//缓存库存
					_this.stock = product.stock

					product.images = product.images.split(',')
					//默认显示第一章图片
					product.activeImage = product.images[0]
					// console.log(product)
					var html = _util.render(detailTpl,product)
					_this.$detailBox.html(html)
				}else{
					_this.$detailBox.html('<p class="empty-message">你查看的商品去火星啦......</p>')
				}
			}
		})
	},
}

$(function(){
	page.init()
})
