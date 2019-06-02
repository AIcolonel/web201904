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

//2.处理导航栏
handleNav();
function handleNav(){
	//1.获取元素
	var aNavItem = document.querySelectorAll(".header .header-nav-item");
	var oNavContent = document.querySelector(".header .header-nav-content");
	var oContainer = oNavContent.querySelector('.container');
	var hideTimer = null;
	//2.循环遍历每一个li,绑定事件
	for(var i =0;i<aNavItem.length-2;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			//js显示上边框
			oNavContent.style.borderTop = "1px solid #ccc";
			//动画显示导航下拉列表
			animate(oNavContent,{height:200},false,function(){
				oNavContent.style.overflow = "visible";
			});

			//动态加载数据
			loadData(this.index);
		}
		aNavItem[i].onmouseleave = function(){
			/*
			hideTimer = setTimeout(function(){
				oNavContent.style.overflow = "hidden";
				//动画隐藏导航下拉列表
				animate(oNavContent,{height:0},false,function(){
					//js隐藏上边框
					oNavContent.style.borderTop = "none";
				});
			},300)
			*/
			hideNav();
		}
	}
	//鼠标移入导航下拉列表显示内容
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	//鼠标移出导航下拉列表隐藏内容
	oNavContent.onmouseleave = function(){
		hideNav();
	}

	//加载数据函数
	function loadData(index){
		var data = aNavItemData[index];
		// console.log(data);
		var html = '';
			html += '<ul>'
			for(var i = 0;i<data.length;i++){
				html +=		'<li>';
				html +=		'	<a href="'+data[i].url+'">';
				html +=		'		<div class="img-box">';
				html +=		'			<img src="'+data[i].src+'" alt="">';
				html +=		'		</div>';
				html +=		'		<p class="header-nav-name">'+data[i].name+'</p>';
				html +=		'		<p class="header-nav-price">'+data[i].price+'元</p>';
				if(data[i].tag){
					html +=		'		<span class="tag">'+data[i].tag+'</span>';
				}
				html +=		'	</a>';
				html +=		'</li>';
			}
			html += '</ul>'

		oContainer.innerHTML = html;
	}

	//隐藏列表共通函数
	function hideNav(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = "hidden";
			//动画隐藏导航下拉列表
			animate(oNavContent,{height:0},false,function(){
				//js隐藏上边框
				oNavContent.style.borderTop = "none";
			});
		},300)
	}
}