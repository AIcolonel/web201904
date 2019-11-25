/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 10:42:09
*/
;(function($){
	$.fn.extend({
		pagination:function(options){
			var $elem = this
			$elem.on('click','a',function(){
				var $this = $(this)
				//1.获取当前页
				var currentPage = $elem.find('.active a').html() / 1
				//2.根据当前页计算点击页面
				var labelText = $this.attr('aria-label')
				var page = 1
				if(labelText == 'Next'){
					page = currentPage + 1
				}else if(labelText == 'Previous'){
					page = currentPage - 1
				}else{
					page = $this.html()
				}
				//如果点击当前页则阻止默认行为
				if(page == currentPage){
					return false
				}
				//由于显示列表页时只需要获取对应分类下的所有数据
				//所以要获取到分类id
				let url = options.url+'?page='+page
				const id = $elem.data('id')
				if(id){
					url = url + '&id='+id
				}
				//3.发送请求
				$.ajax({
					url:url,
					dataType:'json'
				})
				.done(function(result){
					// console.log(result)
					if(result.code == 0){
						$elem.trigger('get-data',result.data)
					}
				})
				.fail(function(err){
					alert('请求失败,请稍后再试!!')
				})
			})
		}
	})
})(jQuery);