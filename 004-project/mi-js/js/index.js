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
	var loadDataTimer = null;
	//2.循环遍历每一个li,绑定事件
	for(var i =0;i<aNavItem.length-2;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			//js显示上边框
			oNavContent.style.borderTop = "1px solid #ccc";
			//模拟加载数据显示loading图标
			oContainer.innerHTML = '<div class="loading"></div>';
			//动画显示导航下拉列表
			animate(oNavContent,{height:200},false,function(){
				oNavContent.style.overflow = "visible";
			});

			//动态加载数据
			var index = this.index;
			//优化不必要的加载数据
			clearTimeout(loadDataTimer);
			loadDataTimer = setTimeout(function(){
				loadData(index);
			},1000)
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

//3.处理轮播图
handleCoursel();
function handleCoursel(){
	new Coursel({
		id:"coursel",
		width:1228,
		height:460,
		img:["images/b1.jpg","images/b2.jpg","images/b3.jpg"],
		playtime:3000
	});
}

//4.处理分类面板
handleCate();
function handleCate(){
	var aCateItem = document.querySelectorAll('.home .banner .cate .cate-list-item');
	var oCateContent = document.querySelector('.home .banner .cate-content');
	var oCateBox = document.querySelector('.home .banner .cate-box');

	//循环遍历每一项监听事件
	for(var i = 0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
			for(var j=0;j<aCateItem.length;j++){
				aCateItem[j].className = "cate-list-item";
			}
			oCateContent.style.display = "block";
			this.className = "cate-list-item active";

			//模拟加载数据
			loadData(this.index)
		}
	}

	//鼠标移出最外层大盒子,面板内容消失
	oCateBox.onmouseleave = function(){
		for(var j=0;j<aCateItem.length;j++){
			aCateItem[j].className = "cate-list-item";
		}
		oCateContent.style.display = "none";
	}

	//加载数据函数
	function loadData(index){
		var data = aCateItemData[index];
		// console.log(data);

		var html = "";
			html += '<ul>'
			for(var i = 0;i<data.length;i++){
				html +=		'<li>';
				html +=			'<a href="'+data[i].url+'">';
				html +=				'<img src="'+data[i].src+'" alt="">';
				html +=				'<span>'+data[i].name+'</span>';
				html +=			'</a>';
				html +=		'</li>';
			}
			html +=	'</ul>';

		oCateContent.innerHTML = html;
	}
}

//5.处理倒计时
handleCountDown();
function handleCountDown(){
	var aTimerNum = document.querySelectorAll('.flash .timer-num');
	var timer = null;
	var endTime = new Date("2019-06-03 23:59:59");

	function handleTimer(){
		var allSeconds = parseInt((endTime.getTime() - Date.now())/1000);
		if(allSeconds <=0){
			allSeconds = 0;
			clearInterval(timer);
		}
		var hours = parseInt(allSeconds /3600);
		var minutes = parseInt(allSeconds % 3600 / 60);
		var seconds = allSeconds % 3600 % 60;

		aTimerNum[0].innerHTML = to2Str(hours);
		aTimerNum[1].innerHTML = to2Str(minutes);
		aTimerNum[2].innerHTML = to2Str(seconds);
	}
	timer = setInterval(handleTimer,500);
	handleTimer();

	function to2Str(num){
		return num>=10 ? ""+num : "0"+num;
	}
}

//7.处理闪购滑动列表
handleMove();
function handleMove(){
	var oSpan = document.querySelectorAll('.flash .flash-ctr');
	var oProductList = document.querySelector('.flash .product-list');

	//点击右边按钮向左滑动
	oSpan[1].onclick = function(){
		oProductList.style.marginLeft = "-980px";
	}
	//点击左边按钮向右滑动
	oSpan[0].onclick = function(){
		oProductList.style.marginLeft = "0";
	}
}