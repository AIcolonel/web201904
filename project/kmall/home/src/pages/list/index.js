/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-23 11:00:10
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
require('util/pagination')

require('./index.css')
var listTpl = require('./index.tpl')

var page = {
	productsListParams:{
		category:_util.getParamsFromUrl('categoryId'),
		keyword:_util.getParamsFromUrl('keyword'),
		page:_util.getParamsFromUrl('page') || 1,
		orderBy:_util.getParamsFromUrl('orderBy') || 'default',
	},
	init:function(){
		this.initPagination()
		this.loadProductsList()
		this.bindEvent()
	},
	initPagination:function(){
		var _this = this
		this.$pagination = $('.pagination-box')
		//初始化分页插件
		this.$pagination.pagination()
		//监听自定义事件获取最新页码
		this.$pagination.on('page-change',function(ev,page){
			_this.productsListParams.page = page
			_this.loadProductsList()
		})
	},
	bindEvent:function(){
		var _this = this
		//点击排序
		$('.sort-item').on('click',function(){
			//默认排序
			if($(this).hasClass('default')){
				if($(this).hasClass('active')){
					return 
				}
				//点击选中状态,取消兄弟元素选中状态
				$(this).addClass('active')
				.siblings('.sort-item').removeClass('active')
				_this.productsListParams.orderBy = 'default'
			}
			//按照价格排序
			else if($(this).hasClass('price')){
				//点击选中状态,取消兄弟元素选中状态
				$(this).addClass('active')
				.siblings('.sort-item').removeClass('active')
				//决定到底是降序还是升序
				if($(this).hasClass('asc')){
					$(this).removeClass('asc')
					.addClass('desc')
					_this.productsListParams.orderBy = 'price_desc'
				}else if($(this).hasClass('desc')){
					$(this).removeClass('desc')
					.addClass('asc')
					_this.productsListParams.orderBy = 'price_asc'
				}
			}
			//更新新的排序规则发送请求
			_this.productsListParams.page = 1
			_this.loadProductsList()
		})
	},
	loadProductsList:function(){
		var _this = this
		api.getProductsList({
			data:this.productsListParams,
			success:function(result){
				// console.log(result)
				if(result.list.length > 0){
					var html = _util.render(listTpl,{
						list:result.list
					})
					$('.product-list-box').html(html)
					//生成分页器
					_this.$pagination.pagination('render',{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
					})
				}else{//没有该条件下的商品
					$('.product-list-box').html('<p class="empty-message">你搜索的商品去火星啦......</p>')
				}	
			}
		})
	},
}

$(function(){
	page.init()
})
