(function($){
	function init($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));
	}
	function to(x,y,callback){
		//处理参数想x,y为了后面的想x,y方法
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		if(this.currentX == x && this.currentY == y) return;
		this.$elem.trigger('move');
		typeof callback == 'function' && callback();
		//更新当前元素的位置坐标
		this.currentX = x;
		this.currentY = y;
	}
	

	function Silent($elem){
		init.call(this,$elem)
	}
	Silent.prototype = {
		constructor:Silent,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem.css({
					left:x,
					top:y
				});
				this.$elem.trigger('moved');
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}

	function Js($elem){
		init.call(this,$elem)
	}
	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
					left:x,
					top:y
				},function(){
					this.$elem.trigger('moved');
				}.bind(this))
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}

	//获取显示移动的方法
	function getmove($elem,options){
		var move = null;
		if(options.js){
			move = new Js($elem);
		}else{
			move = new Silent($elem);
		}
		// console.log(move);
		// return move;
		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
	}

	//当不传任何参数时的默认显示动画
	var DEFAULTS = {
		js:true
	}

	//封装move插件
	$.fn.extend({
		move:function(options,x,y){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!moveObj){
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj);
				}
				//第二次进入该函数则是调用移动的动画方法
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y)
				}
			})
		}
	})
})(jQuery);