/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-13 09:40:28
*/
;(function($){
	//点击退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(result){
			window.location.href = '/'
		})
		.fail(function(err){
			alert('请求失败,请稍后再试')
		})
	})
})(jQuery);