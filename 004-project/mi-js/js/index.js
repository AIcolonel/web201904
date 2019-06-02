//1.处理购物车
handleCart();
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = document.querySelector(".top .cart .loading");
	var oEmptyCart = document.querySelector('.top .cart .empty-cart');

	//鼠标移入和移出监听事件
	oCart.onmouseenter = function(){
		//模拟加载数据显示loading图标
		oLoader.style.display = "block";
		//动画效果卷入下拉列表完成后显示数据
		animate(oCartContent,{height:100},true,function(){
			oLoader.style.display = "none";
			oEmptyCart.style.display = "block";
		});
	}
	oCart.onmouseleave = function(){
		//oCartContent.style.height = "0";
		animate(oCartContent,{height:0},true,function(){
			//鼠标移走购物车恢复初始状态
			oLoader.style.display = "none";
			oEmptyCart.style.display = "none";
		});
	}
}