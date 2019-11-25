/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 17:34:10
*/
;(function($){
	var $formPassword = $('.form-password')
	$('.btn-sub-password').on('click',function(){
		//2.1获取表单数据
		var password = $formPassword.find("[name='password']").val()
		var repassword = $formPassword.find("[name='repassword']").val()
		//2.2验证数据合法性
		//密码是任意3-6位字符 
		var passwordReg = /^\w{3,6}$/
		if(!passwordReg.test(password)){
			$('.err').eq(0).html('密码是任意3-6位字符 ')
			return false
		}else{
			$('.err').eq(0).html('')
		}

		if(password != repassword){
			$('.err').eq(1).html('两次密码输入不一致 ')
			return false
		}else{
			$('.err').eq(1).html('')
		}
	})
})(jQuery);