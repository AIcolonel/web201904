;(function($){
	//4.用户退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout'
		})
		.done(function(user){
			// console.log(user);
			if(user.status == 0){
				//退出成功
				// window.location.reload();
				window.location.href = "/";
			}else{
				//退出失败
				registerErr.html(user.msg);
			}
		})
		.fail(function(err){
			console.log("请求失败")
		})
	})
})(jQuery);