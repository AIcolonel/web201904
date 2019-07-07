(function($){
	/*顶部导航逻辑开始*/
	var $dropdown = $('.dropdown');
	$dropdown.dropdown({
		js:true,
		mode:'slide'
	});
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
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
	$search.search({});
	/*头部搜索区域结束*/
})(jQuery);