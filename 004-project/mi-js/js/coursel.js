function Coursel(options){
	//1.罗列属性
	this.box  = document.getElementById(options.id);
	this.width = options.width;
	this.height = options.height;
	this.img = options.img;
	this.oUlImg = null;
	this.oLeftBtn = null;
	this.oRightBtn = null;
	this.oUlBtns = null;

	//设置轮播图时间
	this.playtime = options.playtime;

	//默认显示第一张图片
	this.now = 0;

	//2.初始化页面
	this.init();
	
	//3.绑定事件
	this.bindEvent();


	//4.是否自动轮播
	if(this.playtime){
		this.auto();
	}
}
Coursel.prototype.init = function(){
	//给外层父容器添加样式
	this.box.style.position = "relative";
	this.box.style.width = this.width + "px";
	this.box.style.height = this.height + "px";
	//1.生成图片父容器
	this.oUlImg = document.createElement('ul');
	//限制图片父容器宽高
	this.oUlImg.style.width = "100%";
	this.oUlImg.style.height = "100%";
	//生成每一个li
	for(var i =0;i<this.img.length;i++){
		//生成li
		var oLi = document.createElement('li');
		//设置li的样式
		oLi.style.width = "100%";
		oLi.style.height = "100%";
		oLi.style.position = "absolute";
		oLi.style.top = 0;
		oLi.style.left = 0;
		//默认显示第一章图片
		if(i == 0){
			oLi.style.zIndex = 99;
		}
		//生成图片
		var oImg = document.createElement('img');
		oImg.src = this.img[i];

		//将图片插入到li中
		oLi.appendChild(oImg);

		//将li插入到图片父容器中
		this.oUlImg.appendChild(oLi);
	}

	//2.生成左右按钮
	this.oLeftBtn = document.createElement("span");
	this.oRightBtn = document.createElement("span");
	//给按钮添加样式
	this.oLeftBtn.className = 'leftbtn';
	this.oRightBtn.className = 'rightbtn';
	//改变按钮显示等级
	this.oLeftBtn.style.zIndex = "999";
	this.oRightBtn.style.zIndex = "999";
	//左右按钮添加内容
	this.oLeftBtn.innerHTML = "&lt;";
	this.oRightBtn.innerHTML = "&gt;";

	//3.生成底部按钮
	this.oUlBtns = document.createElement('ul');
	//改变底部按钮显示等级
	this.oUlBtns.style.zIndex = 999;
	//给底部按钮添加样式
	this.oUlBtns.className = "bottombtn";
	for(var j = 0;j<this.img.length;j++){
		var oLi = document.createElement('li');

		//默认第一个被选中
		if(j == 0){
			oLi.className = "active";
		}
		this.oUlBtns.appendChild(oLi);
	}


	//将图片父容器插入到外层父容器中
	this.box.appendChild(this.oUlImg);
	//将左右按钮插入到外层父容器中
	this.box.appendChild(this.oLeftBtn);
	this.box.appendChild(this.oRightBtn);
	//将按钮父容器插入到外层父容器中
	this.box.appendChild(this.oUlBtns);
	//通过js控制底部按钮的位子
	this.oUlBtns.style.marginLeft = -this.oUlBtns.offsetWidth*0.5 + "px";
}

Coursel.prototype.bindEvent = function(){
	//1.给右箭头绑定点击事件
	var _this = this;
	this.oRightBtn.onclick = function(){
		_this.now++;
		if(_this.now > _this.img.length - 1){
			_this.now = 0;
		}
		_this.tab();
	}
	//2.给左箭头绑定点击事件
	this.oLeftBtn.onclick = function(){
		_this.now--;
		if(_this.now < 0){
			_this.now = _this.img.length - 1;
		}
		_this.tab();
	}
	//3.给底部按钮添加事件
	for(var j = 0;j<this.oUlBtns.children.length;j++){
		this.oUlBtns.children[j].index = j;
		this.oUlBtns.children[j].onclick = function(){
			_this.now = this.index;
			_this.tab();
		}
	}
}
Coursel.prototype.tab = function(){
	for(var i = 0;i<this.oUlImg.children.length;i++){
		this.oUlImg.children[i].style.zIndex = 0;
		this.oUlImg.children[i].style.opacity = 0.2;
		this.oUlBtns.children[i].className = "";
	}
	this.oUlImg.children[this.now].style.zIndex = "99";
	// this.oUlImg.children[this.now].style.opacity = 1;
	//执行动画
	animate(this.oUlImg.children[this.now],{opacity:100});
	this.oUlBtns.children[this.now].className = "active";
}

Coursel.prototype.auto = function(){
	var _this = this;
	//设置定时器
	var timer = 0;
	//自动轮播
	timer = setInterval(this.oRightBtn.onclick,this.playtime);

	//鼠标移入停止动画
	this.box.onmouseover = function(){
		clearInterval(timer);
	}
	//鼠标移除重新开始动画
	this.box.onmouseout = function(){
		timer = setInterval(_this.oRightBtn.onclick,_this.playtime);
	}
}