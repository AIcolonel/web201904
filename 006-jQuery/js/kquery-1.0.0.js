(function(w){
	function kQuery(selector){
		return new kQuery.prototype.init(selector);
	}
	kQuery.fn = kQuery.prototype = {
		constructor:kQuery,
		init:function(selector){
			//1.布尔值是false
			if(!selector){
				return this;
			}
			//2.函数
			else if(kQuery.isFunction(selector)){
				this[0] = document;
				this.context = document;
				this.length = 1;
				document.addEventListener('DOMContentLoaded',selector);
				return this;
			}
		}
	}

	/*kQuery的静态方法*/
	kQuery.isFunction = function(str){
		return typeof str == 'function';
	}


	kQuery.fn.init.prototype = kQuery.fn;
	w.kQuery = w.$ = kQuery;
})(window);