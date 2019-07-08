(function($){

function Coursel($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$courselItems = this.$elem.find('.carousel-item');
	this.$courselBtns = this.$elem.find('.btn-item');
	this.$courselControls = this.$elem.find('.control');

	this.now = this.options.activeIndex;
	
	//2.初始化
	this.init();
}
Coursel.prototype = {
	constructor:Coursel,
	init:function(){
		if(this.options.slide){//划入划出

		}else{//淡入淡出
			//1.隐藏所有图片,显示默认图片
			this.$elem.addClass('fade');
			this.$courselItems.eq(this.now).show();
			//2.底部按钮默认选中
			this.$courselBtns.eq(this.now).addClass('active');
			//3.监听鼠标移入移除显示隐藏左右按钮事件
			this.$elem.hover(function(){
				this.$courselControls.show();
			}.bind(this),function(){
				this.$courselControls.hide();
			}.bind(this));
			//初始化显示隐藏插件
			this.$courselItems.showHide(this.options);
			//4.(事件代理)监听点击左右显示隐藏图片事件
			this.$elem.on('click','.control-left',function(){

			}.bind(this));
			this.$elem.on('click','.control-right',function(){
				this._fade(this.now+1);
			}.bind(this));
		}
	},
	_fade:function(index){
		//index代表将要显示的图片
		//1.隐藏当前
		this.$courselItems.eq(this.now).showHide('hide');
		//2.显示显示将要显示的
		this.$courselItems.eq(index).showHide('show');
		//3.底部按钮更新
		this.$courselBtns.eq(this.now).removeClass('active');
		this.$courselBtns.eq(index).addClass('active');
		//4.更新索引值
		this.now = index;
	}
}

//当不传参数时的默认配置信息
Coursel.DEFAULTS = {
	slide:false,
	activeIndex:0,
	js:true,
	mode:'fade'
}

//封装dropdown插件
$.fn.extend({
	coursel:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var coursel = $elem.data('coursel');
			if(!coursel){
				options = $.extend({},Coursel.DEFAULTS,options);
				coursel = new Coursel($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('coursel',coursel);
			}
			//第二次调用coursel则是调用实例上的方法
			if(typeof coursel[options] == 'function'){
				coursel[options]();
			}
		})
	}
})


})(jQuery);