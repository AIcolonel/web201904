(function($){

function Coursel($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$courselItems = this.$elem.find('.carousel-item');
	this.$courselBtns = this.$elem.find('.btn-item');
	this.$courselControls = this.$elem.find('.control');

	this.itemsLength = this.$courselItems.length;
	this.now = this._getCorrectIndex(this.options.activeIndex);
	this.timer = 0;
	
	//2.初始化
	this.init();
}
Coursel.prototype = {
	constructor:Coursel,
	init:function(){
		if(this.options.slide){//划入划出
			//1.移走所有图片,显示默认图片
			this.$elem.addClass('slide');
			this.$courselItems.eq(this.now).css({left:0});
			//记录当前容器的宽度
			this.itemWidth = this.$courselItems.eq(this.now).width();
			//2.底部按钮默认选中
			this.$courselBtns.eq(this.now).addClass('active');
			//3.监听鼠标移入移除显示隐藏左右按钮事件
			this.$elem.hover(function(){
				this.$courselControls.show();
			}.bind(this),function(){
				this.$courselControls.hide();
			}.bind(this));
			//初始化移动插件
			this.$courselItems.move(this.options);
			//4.(事件代理)监听点击左右划入划出图片事件
			this.$elem.on('click','.control-left',function(){//点击左按钮向右滑动
				this._toggle(this._getCorrectIndex(this.now-1),-1);
			}.bind(this));
			this.$elem.on('click','.control-right',function(){//点击右按钮向左滑动
				this._toggle(this._getCorrectIndex(this.now+1),1);
			}.bind(this));
			//5.是否自动轮播
			if(this.options.autoplay){
				this.autoplay();
				//6.鼠标移入容器停止轮播移出开始轮播
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
			//7.监听底部按钮事件
			var _this = this;
			this.$courselBtns.on('click',function(){
				//获取当前索引值
				var index = _this.$courselBtns.index(this);
				_this._toggle(index);
			});
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
				this._fade(this._getCorrectIndex(this.now-1));
			}.bind(this));
			this.$elem.on('click','.control-right',function(){
				this._fade(this._getCorrectIndex(this.now+1));
			}.bind(this));
			//5.是否自动轮播
			if(this.options.autoplay){
				this.autoplay();
				//6.鼠标移入容器停止轮播移出开始轮播
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
			//7.监听底部按钮事件
			var _this = this;
			this.$courselBtns.on('click',function(){
				//获取当前索引值
				var index = _this.$courselBtns.index(this);
				_this._fade(index);
			});
		}
	},
	_fade:function(index){
		//index代表将要显示的图片
		//如果当前显示和即将要显示的是同一张图片则无需执行以下代码
		if(index == this.now) return;
		console.log(index);
		//1.隐藏当前
		this.$courselItems.eq(this.now).showHide('hide');
		//2.显示显示将要显示的
		this.$courselItems.eq(index).showHide('show');
		//3.底部按钮更新
		this.$courselBtns.eq(this.now).removeClass('active');
		this.$courselBtns.eq(index).addClass('active');
		//4.更新索引值
		this.now = index;
	},
	_toggle:function(index,direction){
		//index代表将要显示的图片
		//如果当前显示和即将要显示的是同一张图片则无需执行以下代码
		if(index == this.now) return;
		//direation代表方向1表示正方向-1表示反方向
		if(index > this.now){
			direction = 1;
		}else{
			direction = -1;
		}
		//1.把将要显示的放到指定位置
		this.$courselItems.eq(index).css({left:direction*this.itemWidth});
		//2.移走当前
		this.$courselItems.eq(this.now).move('x',-1*direction*this.itemWidth);
		//3.移入将要显示的
		this.$courselItems.eq(index).move('x',0);
		//4.底部按钮更新
		this.$courselBtns.eq(this.now).removeClass('active');
		this.$courselBtns.eq(index).addClass('active');
		//5.更新索引值
		this.now = index;
	},
	_getCorrectIndex:function(num){
		if(num >= this.itemsLength) return 0;
		if(num <0) return this.itemsLength -1;
		return num;
	},
	autoplay:function(){
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			this.$courselControls.eq(1).trigger('click');
		}.bind(this),this.options.autoplay)
	},
	paused:function(){
		clearInterval(this.timer);
	}
}

//当不传参数时的默认配置信息
Coursel.DEFAULTS = {
	slide:true,
	activeIndex:0,
	js:true,
	mode:'fade',
	autoplay:0
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