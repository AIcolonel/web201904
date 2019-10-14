;(function(win,doc){
	//1.获取页面根元素
	var oRoot = doc.getElementsByTagName('html')[0];
	function refresh(){
		//2.获取整个视口宽度
		var oWidth = doc.body.clientWidth || doc.documentElement.clientWidth;
		console.log(oWidth);
		//3.设置根元素字体大小比例
		var fontSize = oWidth / 10;
		//4.设置根元素字体大小
		oRoot.style.fontSize = fontSize + 'px';
	}
	win.addEventListener('DOMContentLoaded',refresh,false);
	win.addEventListener('resize',refresh,false);
})(window,document)