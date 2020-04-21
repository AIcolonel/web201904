/*
* @Author: Chen
* @Date:   2019-12-20 16:07:16
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-23 10:58:45
*/
require('./index.css')
var tpl = require('./index.tpl')

var _util = require('util')

;(function($){
	function Pagination($elem){
		this.$elem = $elem
		this.bindEvent()
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){
			var _this = this
			this.$elem.on('click','.page-item',function(){
				if($(this).hasClass('disabled') || $(this).hasClass('active')){
					return 
				}
				var page = $(this).data('value')
				//触发自定义事件传递数据
				_this.$elem.trigger('page-change',page)
			})
		},
		render:function(options){
			// console.log(options)
			//1.计算总页数
			var pages = Math.ceil(options.total / options.pageSize)
			//2.计算分页数据
			//将分页数据存在一个数组中
			var pageArray = []
			//计算上一页和下一页
			var prev = options.current - 1 
			var next = options.current + 1 
			pageArray.push({
				name:'上一页',
				value:prev,
				disabled:prev > 0 ? false : true
			})
			//由于模板渲染的顺序是按照插入数据的顺序因此页码插入时要严格按照顺序插入
			//计算页码:只显示当前页的前后三条数据
			//1 2 3 *4* 5 6 7
			//4 5 6 *7* 8 9 10
			var start = options.current - options.range > 1 ? options.current - options.range : 1
			var end = options.current + options.range < pages ? options.current + options.range : pages
			for(var i = start;i<=end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:options.current == i ? true : false
				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:next <= pages ? false : true
			})
			

			//生成分页器结构
			// console.log(pageArray)
			var html = _util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			})
			$('.pagination-box').html(html)
		}
	}
	Pagination.DEFAULT = {
		range:3
	}


	$.fn.extend({
		pagination:function(fn,options){
			//console.log(this) this是一个jquery对象
			return this.each(function(){
				//console.log(this) this是一个dom节点
				var $this = $(this)
				var pagination = $this.data('pagination')
				//单例模式
				if(!pagination){
					var pagination = new Pagination($(this))
					$this.data('pagination',pagination)
				}
				//合并参数
				options = $.extend({},Pagination.DEFAULT,options)
				if(typeof pagination[fn] == 'function'){
					pagination[fn](options)
				}
			}) 
		}
	})
})(jQuery)