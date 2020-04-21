/*
* @Author: Chen
* @Date:   2019-12-16 11:43:37
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 09:52:17
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
var listTpl = require('./index.tpl')

var page = {
	orderListParams:{
		keyword:_util.getParamsFromUrl('keyword'),
		page:_util.getParamsFromUrl('page') || 1,
	},
	init:function(){
		//渲染侧边栏
		this.renderSide()
		this.initPagination()
		this.loadOrdersList()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this
		this.$pagination = $('.pagination-box')
		//初始化分页插件
		this.$pagination.pagination()
		//监听自定义事件获取最新页码
		this.$pagination.on('page-change',function(ev,page){
			_this.orderListParams.page = page
			_this.loadOrdersList()
		})
	},
	loadOrdersList:function(){
		var _this = this
		api.getOrdersList({
			data:this.orderListParams,
			success:function(result){
				console.log(result)
				if(result.list.length > 0){
					//处理时间
					result.list.forEach(function(order){
						order.createdTime = new Date(order.createdAt).toLocaleString()
					})

					var html = _util.render(listTpl,{
						list:result.list
					})
					$('.order-box').html(html)
					//生成分页器
					_this.$pagination.pagination('render',{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
					})
				}else{//没有该条件下的商品
					$('.order-box').html('<p class="empty-message">您还没有订单</p>')
				}	
			}
		})
	},
}

$(function(){
	page.init()
})
