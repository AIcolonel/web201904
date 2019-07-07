(function($){

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchInput = this.$elem.find('.search-input');
	this.$searchBtn = this.$elem.find('.search-btn');
	this.$searchLayer = this.$elem.find('.search-layer');
	this.$searchForm = this.$elem.find('.search-form');
	
	//判断html是否被加载
	this.isLoadedHtml = false;
	//2.初始化
	this.init();

	//3.判断是否显示下拉层 
	if(this.options.autocomplete){
		this.autocomplete();
	}
}
Search.prototype = {
	constructor:Search,
	init:function(){
		//监听提交按钮事件
		this.$searchBtn.on('click',$.proxy(this.submit,this));
	},
	submit:function(){
		if(!this.getInputVal()){
			//如果没有数据则不提交请求
			return false;
		}
		this.$searchForm.trigger('submit');
	},
	getInputVal:function(){
		return $.trim(this.$searchInput.val());
	},
	autocomplete:function(){
		//1.初始化显示隐藏插件
		this.$searchLayer.showHide(this.options);
		//2.监听输入框输入事件获取数据(jsonp获取数据)
		this.$searchInput.on('input',$.proxy(this.getData,this));
		//3.点击页面别的部分隐藏下拉层
		$(document).on('click',function(){
			this.hideLayer();
		}.bind(this));
		//4.获取焦点下拉层出现
		this.$searchInput.on('focus',function(){
			//如果输入框没有数据则不显示下拉层
			if(this.getInputVal()){
				this.showLayer();
			}
		}.bind(this));
		//5.点击输入框按钮是阻止事件冒泡
		this.$searchInput.on('click',function(ev){
			ev.stopPropagation();
		});
		//6.(事件委托)完成点击下拉列表每一项提交数据
		var _this = this;
		this.$elem.on('click','.search-item',function(){
			//1.获取点击的项的内容
			var val = $(this).html();
			//2.设置输入框的值
			_this.setInputVal(val);
			//3.提交数据
			_this.submit();
		})
	},
	getData:function(){
		console.log("will get data....");
		//获取数据
		//如果数据为空则不发送请求
		if(!this.getInputVal()){
			this.hideLayer();
			return;
		}
		// console.log('will get data....');
		$.ajax({
			url:this.options.url + this.getInputVal(),
			dataType:'jsonp',
			jsonp:'callback'
		})
		.done(function(data){
			/*
			//1.生成html结构
			var html = '';
			for(var i = 0 ;i<data.result.length;i++){
				html += '<li>'+data.result[i][0]+'</li>'
			}
			//2.将内容插入到搜索下拉层中
			this.appendHTML(html);
			//3.显示下拉层
			if(html == ''){
				this.hideLayer();
			}else{
				this.showLayer();
			}
			*/
			this.$elem.trigger('getData',data);
		}.bind(this))
		.fail(function(err){
			this.$elem.trigger('getNoData');
		}.bind(this));
	},
	appendHTML:function(html){
		this.$searchLayer.html(html);
		this.isLoadedHtml = !!html;
	},
	showLayer:function(){
		if(!this.isLoadedHtml) return;
		this.$searchLayer.showHide('show');
	},
	hideLayer:function(){
		this.$searchLayer.showHide('hide');
	},
	setInputVal:function(val){
		this.$searchInput.val(val);
	}
}

//当不传参数时的默认配置信息
Search.DEFAULTS = {
	autocomplete:true,
	url:'https://suggest.taobao.com/sug?q=',
	js:true,
	mode:'slide'
}

//封装dropdown插件
$.fn.extend({
	search:function(options,val){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('search',search);
			}
			//第二次调用search则是调用实例上的方法
			if(typeof search[options] == 'function'){
				search[options](val);
			}
		})
	}
})


})(jQuery);