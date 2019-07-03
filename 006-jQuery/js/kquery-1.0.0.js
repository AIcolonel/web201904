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
			//3.字符串
			else if(kQuery.isString(selector)){
				//3.1代码片段
				if(kQuery.isHTML(selector)){
					var tempDiv = document.createElement('div');
					tempDiv.innerHTML = selector;
					for(var i = 0;i<tempDiv.children.length;i++){
						this[i] = tempDiv.children[i]
					}
					this.length = tempDiv.children.length;

					return this;

				}else{//3.2选择器
					var doms = document.querySelectorAll(selector);
					for(var i = 0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length = doms.length;
					return this;
				}
			}
			//4.数组
			else if(kQuery.isArray(selector)){
				for(var i = 0;i<selector.length;i++){
					this[i] = selector[i];
				}
				this.length = selector.length;
				return this;
			}
			//5.对象(其他)
			else{
				this[0] = selector;
				this.context = document;
				this.length = 1;
				return this;
			}
		}
	}

	/*kQuery的静态方法*/
	kQuery.isFunction = function(str){
		return typeof str == 'function';
	}
	kQuery.isString = function(str){
		return typeof str == 'string';
	}
	kQuery.isHTML = function(str){
		return /<[^<>]+>/.test(str);
	}
	kQuery.isArray = function(str){
		return typeof str == 'object' && (length in str);
	}


	kQuery.fn.init.prototype = kQuery.fn;
	w.kQuery = w.$ = kQuery;
})(window);