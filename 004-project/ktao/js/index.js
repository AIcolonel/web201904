(function($){
	//共通函数
	//1.只加载一次html
	function loadHtmlOnce($elem,callback){
		var url = $elem.data('load');
		//如果没有地址则无需加载数据
		if(!url) return;
		//判断数据如果没有被加载则发送请求
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);
			})
		}
	}
	//2.加载图片
	function loadImage(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			typeof success == 'function' && success(imgUrl);
		}
		image.onerror = function(){
			typeof error == 'function' && error(imgUrl);
		}
		image.src = imgUrl;
	}
	//3.只加载一次数据
	function getDataOnce($elem,url,callback){
		var data = $elem.data('data');
		if(!data){
			$.getJSON(url,function(resData){
				callback(resData);
				$elem.data('data',resData);
			})
		}else{
			callback(data);
		}
	}
	//4.懒加载
	/*
		{
			totalNum:5,
			$elem:$elem,
			eventName:'coursel-show',
			eventPrifix:'coursel'
		}
	*/
	function lazyLoad(options){
		var item = {},
			totalLoadedNum = 0,
			loadFn = null,
			totalNum = options.totalNum,
			$elem = options.$elem,
			eventName = options.eventName,
			eventPrifix = options.eventPrifix;
			console.log(totalNum);
		//1.开始加载
		$elem.on(eventName,loadFn = function(ev,index,elem){
			//判断图片有没有被加载
			if(!item[index]){
				$elem.trigger(eventPrifix+'-load',[index,elem,function(){
					//图片已经被加载
					item[index] = 'isLoaded';
					totalLoadedNum++;
					//所有图片都被加载则移除事件
					if(totalLoadedNum > totalNum){
						$elem.trigger(eventPrifix+'-loaded');
					}
				}]);
			}
		})
		//3.加载完毕
		$elem.on(eventPrifix+'-loaded',function(){
			$elem.off(eventName,loadFn);
		})
	}



	/*顶部导航逻辑开始*/
	var $topDropdown = $('.top .dropdown');
	$topDropdown.dropdown({
		js:true,
		mode:'slide'
	});
	//加载数据
	$topDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildTopLayer)
		}
	});

	//生成顶部下拉层结构
	function buildTopLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		//生成HTML
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
		}
		//将HTML插入到下拉层中
		//模拟网络延迟
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}

	/*暴露方法测试*/
	/*
	$('button').on('click',function(){
		$dropdown.dropdown('show');
	})
	*/
	/*顶部导航逻辑结束*/

	/*头部搜索区域开始*/
	var $search = $('.search');
	//成功获取并处理数据
	$search.on('getData',function(ev,data){
		var $elem = $(this);
		var $layer = $elem.find('.search-layer');
		//1.生成html结构
		var data = data.result;
		var html = createSearchLayer(data,10);
		//2.将内容插入到搜索下拉层中
		$elem.search('appendHTML',html);
		//3.显示下拉层
		if(html == ''){
			$elem.search('hideLayer');
		}else{
			$elem.search('showLayer');
		}
	})
	//获取数据失败处理
	$search.on('getNoData',function(ev){
		$elem.search('appendHTML','');
		$elem.search('hideLayer');
	});

	$search.search({});
	//生成搜索下拉列表html结构并且可以控制数据条目
	function createSearchLayer(data,max){
		var html = '';
		for(var i = 0 ;i<data.length;i++){
			if(i >= max) break;
			html += '<li class="search-item">'+data[i][0]+'</li>'
		}
		return html;
	}
	/*头部搜索区域结束*/

	/*分类列表逻辑开始*/
	var $categoryDropdown = $('.focus .dropdown');
	$categoryDropdown.dropdown({
		js:true,
		mode:'fade'
	});
	//加载数据
	$categoryDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildCategoryLayer);
		}
	});

	//生成分类列表左拉层结构
	function buildCategoryLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		//生成HTML
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details">';
			html +=	'	<dt class="category-details-title fl">';
			html +=	'		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
			html +=	'	</dt>';
			html +=	'	<dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html +=	'<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html +=	'	</dd>';
			html +=	'</dl>';
		}
		//将HTML插入到下拉层中
		//模拟网络延迟
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}
	/*分类列表逻辑结束*/

	/*轮播图逻辑开始*/
	var $coursel = $('.carousel .carousel-wrap');
	lazyLoad({
		totalNum:$coursel.find('.carousel-img').length - 1,
		$elem:$coursel,
		eventName:'coursel-show',
		eventPrifix:'coursel'
	})
	//2.执行加载
	$coursel.on('coursel-load',function(ev,index,elem,success){
		// console.log('will load img',index);
		var $elem = $(elem);
		var $imgs = $elem.find('.carousel-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','images/focus-carousel/placeholder.png');
			});
			//加载完成后执行函数
			success();
		})
	})

	$coursel.coursel({});
	/*轮播图逻辑结束*/

	/*今日热销逻辑开始*/
	var $todaysCoursel = $('.todays .carousel-wrap');
	lazyLoad({
		totalNum:$todaysCoursel.find('.carousel-img').length - 1,
		$elem:$todaysCoursel,
		eventName:'coursel-show',
		eventPrifix:'coursel'
	})
	//2.执行加载
	$todaysCoursel.on('coursel-load',function(ev,index,elem,success){
		var $elem = $(elem);
		var $imgs = $elem.find('.carousel-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','images/focus-carousel/placeholder.png');
			});
			//加载完成后执行函数
			success();
		})
	})
	$todaysCoursel.coursel({});
	/*今日热销逻辑结束*/

	/*楼层逻辑开始*/
	//楼层html懒加载
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeaderHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeaderHtml(oneFloorData){
		var html ='';
		html += '<div class="floor-hd">';
		html +=	'	<h2 class="floor-title fl">';
		html +=	'		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
		html +=	'		<span class="floor-title-text">'+oneFloorData.text+'</span>';
		html +=	'	</h2>';
		html +=	'	<ul class="tab-item-wrap fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
			html +=	'<li class="fl">';
			html +=	'	<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
			html +=	'</li>';
			if(i != oneFloorData.tabs.length - 1){
				html +=	'<li class="fl tab-divider"></li>';
			}
		}
		html +=	'	</ul>';
		html +=	'</div>';

		return html;
	}
	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0;i<oneFloorData.items.length;i++){
			html +=	'	<ul class="tab-panel clearfix">';
			for(var j = 0;j<oneFloorData.items[i].length;j++){
				html +=	'		<li class="floor-item fl">';
				html +=	'			<p class="floor-item-pic">';
				html +=	'				<a href="#">';
				html +=	'					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html +=	'				</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-name">';
				html +=	'				<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+' </p>';
				html +=	'		</li>';
			}
			html +=	'	</ul>';
		}
		html +=	'</div>';
		return html;
	}
	//判断楼层是否在可视区
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop())
	};
	var $floor = $('.floor');
	var $win = $(window);
	var $doc = $(document);
	//楼层图片懒加载2.执行加载
	$floor.on('tab-load',function(ev,index,elem,success){
		// console.log('will load img',index);
		var $elem = $(elem);
		var $imgs = $elem.find('.floor-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','images/focus-carousel/placeholder.png');
			});
		})
	})
	//楼层html结构懒加载
	lazyLoad({
		totalNum:$floor.length - 1,
		$elem:$doc,
		eventName:'floor-show',
		eventPrifix:'floor'
	})
	//楼层html懒加载:2.执行加载
	$doc.on('floor-load',function(ev,index,elem,success){
		//1.生成html结构
		getDataOnce($doc,'data/floor/floorData.json',function(data){
			// console.log(data[index]);
			var html = buildFloorHtml(data[index]);
			//2.加载html
			$(elem).html(html);
			//3.楼层图片懒加载
			// floorImgLazyLoad($(elem));
			lazyLoad({
				totalNum:$(elem).find('.floor-img').length - 1,
				$elem:$(elem),
				eventName:'tab-show',
				eventPrifix:'tab'
			})
			//4.激活选项卡
			$(elem).tab({});
		});
		//加载成功执行函数
		success();
	})
	function timeToShow(){
		$floor.each(function(index,elem){
			if(isVisible($(elem))){
				// console.log(index,'in show.......');
				$doc.trigger('floor-show',[index,elem]);
			}
		})
	}
	$win.on('load scroll resize',function(){
		clearTimeout($floor.showTimer);
		$floor.showTimer = setTimeout(timeToShow,200);
	})
	/*楼层逻辑结束*/

	/*电梯逻辑开始*/
	var $elevator = $('.elevator');
	var $elevatorItems = $('.elevator-item');

	//获取楼层号
	function getFloorNum(){
		var num = -1;
		$floor.each(function(index,elem){
			num = index;
			if($(elem).offset().top > $win.height()/2 + $win.scrollTop()){
				num = index - 1;
				return false;
			}
		})
		return num;
	}
	//设置电梯号
	function setElevator(){
		var num = getFloorNum();
		if(num == -1){
			$elevator.fadeOut();
		}else{
			$elevator.fadeIn();
			//清除所有选中的
			$elevatorItems.removeClass('elevator-active');
			//选中对应的电梯号
			$elevatorItems.eq(num).addClass('elevator-active');
		}
	}
	$win.on('load scroll resize',function(){
		clearTimeout($elevator.showElevatorTimer);
		$elevator.showElevatorTimer = setTimeout(setElevator,200);
	})
	//监听点击电梯事件回到对应楼层
	$elevator.on('click','.elevator-item',function(){
		var index = $elevatorItems.index(this);
		$('html,body').animate({
			scrollTop:$floor.eq(index).offset().top
		});
	})
	/*电梯逻辑结束*/

	/*工具条逻辑开始*/
	var $backToTop = $('#backToTop');
	$backToTop.on('click',function(){
		$('html,body').animate({
			scrollTop:0
		});
	})
	/*工具条逻辑结束*/

})(jQuery);