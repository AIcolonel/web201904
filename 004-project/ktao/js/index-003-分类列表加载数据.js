(function($){
	
	/*顶部导航逻辑开始*/
	var $topDropdown = $('.top .dropdown');
	$topDropdown.dropdown({
		js:true,
		mode:'slide'
	});
	//加载数据
	$topDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			//如果没有地址则无需加载数据
			if(!url) return;
			//判断数据如果没有被加载则发送请求
			if(!$elem.data('isLoaded')){
				$.getJSON(url,function(data){
					console.log(data);
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
				})
			}
		}
	});

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
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			//如果没有地址则无需加载数据
			if(!url) return;
			//判断数据如果没有被加载则发送请求
			if(!$elem.data('isLoaded')){
				$.getJSON(url,function(data){
					console.log(data);
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
				})
			}
		}
	});
	/*分类列表逻辑结束*/

})(jQuery);