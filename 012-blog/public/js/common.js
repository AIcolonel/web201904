(function($){

	var $login = $('#login');
	var $register = $('#register');
	//1.实现登录和注册面板切换
	//点击注册
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	});
	//点击登录
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	});

	//验证信息
	//用户名只能是字母开头,3-10位字符
	var reg1 = /^[a-z][a-z0-9_]{2,9}$/i;
	//密码是3-6位字符
	var reg2 = /^\w{3,6}$/;
	//2.用户注册
	$('#sub-register').on('click',function(){
		var username = $register.find('[name="username"]').val();
		var password = $register.find('[name="password"]').val();
		var repassword = $register.find('[name="repassword"]').val();
		var registerErr = $register.find('.err')

		//用户名只能是字母开头,3-10位字符
		var reg1 = /^[a-z][a-z0-9_]{2,9}$/i;
		//密码是3-6位字符
		var reg2 = /^\w{3,6}$/;
		var errMsg = '';

		if(!reg1.test(username)){
			errMsg = '用户名只能是字母开头,包含数字字符下划线的3-10位字符';
		}else if(!reg2.test(password)){
			errMsg = '密码是3-6位字符';
		}else if(password != repassword){
			errMsg = '输入密码不一致,请再次输入';
		}else{
			errMsg = '';
		}

		//注册失败
		if(errMsg){
			registerErr.html(errMsg);
		}
		//注册成功
		else{
			$.ajax({
				url:"/user/register",
				type:"post",
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(user){
				if(user.status == 0){
					//注册成功,跳转登录界面
					$register.hide();
					$login.show();
				}else{
					//注册失败
					registerErr.html(user.msg);
				}
			})
			.fail(function(err){
				console.log("请求失败")
			})
		}
	});
	//3.用户登录
	$('#sub-login').on('click',function(){
		var username = $login.find('[name="username"]').val();
		var password = $login.find('[name="password"]').val();
		var registerErr = $login.find('.err')

		var errMsg = '';

		if(!reg1.test(username)){
			errMsg = '用户名只能是字母开头,包含数字字符下划线的3-10位字符';
		}else if(!reg2.test(password)){
			errMsg = '密码是3-6位字符';
		}else{
			errMsg = '';
		}

		//注册失败
		if(errMsg){
			registerErr.html(errMsg);
		}
		//注册成功
		else{
			$.ajax({
				url:"/user/login",
				type:"post",
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(user){
				// console.log(user);
				if(user.status == 0){
					//登录成功
					window.location.reload();
				}else{
					//登录失败
					registerErr.html(user.msg);
				}
			})
			.fail(function(err){
				console.log("请求失败")
			})
		}
	});
	
})(jQuery);